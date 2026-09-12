import { useEffect, useState } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

const STORAGE_KEY = "marathon-registrants";

export default function DashboardPage() {
  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setRegistrants([]);
      return;
    }
    try {
      setRegistrants(JSON.parse(raw) as Registrant[]);
    } catch {
      setRegistrants([]);
    }
  }, []);
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {registrants.length === 0 ? (
        <p className="text-muted mt-3">ยังไม่มีผู้ลงทะเบียน</p>
      ) : (
        <>
          <p className="text-muted mt-3">
            ผู้ลงทะเบียนแล้ว ({registrants.length} คน)
          </p>
          {registrants.map((registrant) => (
            <UserRegisterCard key={registrant.id} registrant={registrant} />
          ))}
        </>
      )}
    </div>
  );
}