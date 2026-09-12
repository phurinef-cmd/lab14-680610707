import { useEffect, useState } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

export default function DashboardPage() {
  const [registrations, setRegistrations] = useState<Registrant[]>([]);

  useEffect(() => {
    const data: Registrant[] = JSON.parse(
      localStorage.getItem("registrations") || "[]"
    );

    setRegistrations(data);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      {registrations.length === 0 ? (
        <div className="alert alert-info">
          No registration data.
        </div>
      ) : (
        registrations.map((registrant) => (
          <UserRegisterCard
            key={registrant.id}
            registrant={registrant}
          />
        ))
      )}
    </div>
  );
}