import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface DiaryEntry {
  id: number;
  emotion: string;
  intensity: number;
  notes: string;
  createdAt: string;
}

export function useDiary() {
  const { token } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEntries = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await fetch("/api/diary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }

      const data = await response.json();
      setEntries(data.entries || []);
    } catch (error) {
      console.error("Fetch entries error:", error);
      toast.error("Erro ao carregar entradas");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const addEntry = useCallback(
    async (emotion: string, intensity: number, notes: string) => {
      if (!token) {
        toast.error("Você precisa estar autenticado");
        return false;
      }

      try {
        setIsLoading(true);
        const response = await fetch("/api/diary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ emotion, intensity, notes }),
        });

        if (!response.ok) {
          throw new Error("Failed to create entry");
        }

        toast.success("Entrada registrada com sucesso!");
        await fetchEntries();
        return true;
      } catch (error) {
        console.error("Add entry error:", error);
        toast.error("Erro ao registrar entrada");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token, fetchEntries]
  );

  const updateEntry = useCallback(
    async (id: number, emotion: string, intensity: number, notes: string) => {
      if (!token) {
        toast.error("Você precisa estar autenticado");
        return false;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/diary/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ emotion, intensity, notes }),
        });

        if (!response.ok) {
          throw new Error("Failed to update entry");
        }

        toast.success("Entrada atualizada com sucesso!");
        await fetchEntries();
        return true;
      } catch (error) {
        console.error("Update entry error:", error);
        toast.error("Erro ao atualizar entrada");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token, fetchEntries]
  );

  const deleteEntry = useCallback(
    async (id: number) => {
      if (!token) {
        toast.error("Você precisa estar autenticado");
        return false;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/diary/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete entry");
        }

        toast.success("Entrada removida com sucesso!");
        await fetchEntries();
        return true;
      } catch (error) {
        console.error("Delete entry error:", error);
        toast.error("Erro ao remover entrada");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token, fetchEntries]
  );

  return {
    entries,
    isLoading,
    fetchEntries,
    addEntry,
    updateEntry,
    deleteEntry,
  };
}
