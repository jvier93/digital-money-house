"use client";

export type EmptyStateType = "error" | "empty";

type EmptyStateProps = {
  type?: EmptyStateType;
  message: string;
};

export function EmptyState({ type = "empty", message }: EmptyStateProps) {
  const renderContent = () => {
    switch (type) {
      case "error":
        return (
          <>
            <div className="mb-2 text-3xl text-red-500">⚠️</div>
            <p className="font-medium text-red-600">{message}</p>
            <p className="mt-1 text-sm text-gray-500">
              Intenta recargar la página
            </p>
          </>
        );
      case "empty":
      default:
        return (
          <>
            <div className="mb-2 text-4xl text-gray-400">📊</div>
            <p className="text-gray-600">{message}</p>
          </>
        );
    }
  };

  return (
    <div className="py-12" data-testid="empty-state">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        {renderContent()}
      </div>
    </div>
  );
}
