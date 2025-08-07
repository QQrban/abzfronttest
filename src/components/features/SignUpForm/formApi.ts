import type { UserForm } from "../../../types/types";

export async function getPositions() {
  const res = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
  );
  const data = await res.json();
  return data.success ? data.positions : [];
}

export async function getToken(): Promise<string> {
  const res = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/token"
  );
  const data = await res.json();
  return data.token;
}

export async function submitUser(userForm: UserForm, token: string) {
  const formData = new FormData();
  formData.append("name", userForm.name);
  formData.append("email", userForm.email);
  formData.append("phone", userForm.phone);
  formData.append("position_id", userForm.position_id.toString());
  if (userForm.photo) {
    formData.append("photo", userForm.photo);
  }

  const res = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/users",
    {
      method: "POST",
      headers: { Token: token },
      body: formData,
    }
  );

  return await res.json();
}
