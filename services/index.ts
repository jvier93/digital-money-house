// services/user.ts

type LoginResponse = { token: string };
type AccountDataResponse = {
  id: number;
  user_id: number;
  cvu: number;
  available_amount: number;
};
type UserDetailsResponse = {
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
