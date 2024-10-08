import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserEmail } from "@/repositories/user.repository";

import { Role } from "@prisma/client";
import { hashPassword } from "@/lib/auth.utils";

export async function POST(req: NextRequest) {
  const { email, username, password, confirmPassword, roles, score } =
    await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Password does not match!" },
      { status: 400 }
    );
  }

  const existUser = await findUserEmail({ email });
  if (existUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  try {
    const user = await createUser({
      email,
      username,
      password: await hashPassword(password),
      role: roles ?? Role.USER,
      score: score ?? 0,
    });

    return NextResponse.json(
      { message: "Success", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
