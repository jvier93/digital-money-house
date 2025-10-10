// services/user.ts

type LoginResponse = { token: string };
type AccountDataResponse = {
  id: number;
  user_id: number;
  cvu: string;
  available_amount: number;
  alias: string;
};
type UserDetailsResponse = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  dni: string;
};

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  const data: LoginResponse = await res.json();
  return data.token;
}

export async function getAccountData(
  token: string,
): Promise<AccountDataResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    next: { tags: ["user-account"] },
  });

  if (!res.ok) throw new Error("Failed to fetch account info");

  return res.json();
}

export async function getUserDetails(
  userId: number,
  token: string,
): Promise<UserDetailsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch user details");

  return res.json();
}
export type Transaction = {
  id: number;
  account_id: number;
  type: string;
  description: string;
  origin?: string;
  destination?: string;
  amount: number;
  dated: string;
};

export async function getAccountActivity(
  accountId: number,
  token: string,
  options?: {
    sortByDate?: "asc" | "desc";
    limit?: number;
  },
): Promise<Transaction[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}/activity`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      next: { tags: ["user-activity"] },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch account activity");

  const data: Transaction[] = await res.json();

  let result = Array.isArray(data) ? data : [];

  if (options?.sortByDate) {
    result = result.sort((a, b) =>
      options.sortByDate === "desc"
        ? new Date(b.dated).getTime() - new Date(a.dated).getTime()
        : new Date(a.dated).getTime() - new Date(b.dated).getTime(),
    );
  }

  if (options?.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
}

export type CardType = {
  account_id: number;
  cod: number;
  expiration_date: string;
  first_last_name: string;
  id: number;
  number_id: number;
};

export async function getAccountCards(
  accountId: number,
  token: string,
): Promise<CardType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}/cards`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      next: { tags: ["user-cards"] },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch account cards");

  return res.json();
}

export async function getTransactionById(
  accountId: number,
  transactionId: number,
  token: string,
): Promise<Transaction> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}/transactions/${transactionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    },
  );

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Transaction not found");
    }
    throw new Error("Failed to fetch transaction");
  }

  return res.json();
}

export type DepositRequest = {
  amount: number;
  dated: string;
  destination: string;
  origin: string;
};

export async function depositMoney(
  accountId: number,
  depositData: DepositRequest,
  token: string,
): Promise<Transaction> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}/deposits`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(depositData),
    },
  );

  if (!res.ok) throw new Error("Failed to process deposit");

  const transaction: Transaction = await res.json();
  return transaction;
}

export type Service = {
  id: number;
  name: string;
};

export type ServiceDetail = {
  id: number;
  name: string;
  date: string;
  invoice_value: string;
};

export async function getPaymentServices(): Promise<Service[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "";
  const res = await fetch(`${baseUrl}/service`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch payment services");

  return res.json();
}

export async function getPaymentServiceById(
  serviceId: number,
): Promise<ServiceDetail> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "";
  const res = await fetch(`${baseUrl}/service/${serviceId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch payment service details");

  return res.json();
}

export type ServicePaymentRequest = {
  amount: number;
  dated: string;
  description: string;
};

export async function payService(
  accountId: number,
  paymentData: ServicePaymentRequest,
  token: string,
): Promise<Transaction> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(paymentData),
    },
  );

  if (!res.ok) throw new Error("Failed to process service payment");

  const transaction: Transaction = await res.json();
  return transaction;
}
