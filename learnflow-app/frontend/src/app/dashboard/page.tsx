"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Role } from "@/types";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoUser: User = {
      id: "demo",
      email: "demo@learnflow.ai",
      name: "Demo User",
      role: "STUDENT" as Role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUser(demoUser);
    setLoading(false);
  }, []);