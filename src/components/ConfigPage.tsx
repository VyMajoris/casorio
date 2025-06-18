"use client";

import { useEffect, useState } from "react";
import { addDonation, getDonations, getTotalDonated, type Donation } from "@/lib/donations";
import { Libre_Baskerville } from "next/font/google";
import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { createClient } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function ConfigPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("PIX");
  const [payerName, setPayerName] = useState("");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);

 

  const fetchPassword = async (): Promise<string | null> => {
    const supabase = getSupabase();
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return null;
    }
    const { data, error } = await supabase
      .from("password")
      .select("password")
      .single();
    if (error) {
      console.error("Error fetching password:", error);
      return null;
    }
    return data?.password ?? null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const dbPassword = await fetchPassword();
      if (dbPassword && password === dbPassword) {
        setIsAuthenticated(true);
        setMessage("");
        sessionStorage.setItem("adminPassword", password);
      } else {
        setMessage("Senha incorreta");
      }
    } catch (err) {
      setMessage("Erro ao verificar senha");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("adminPassword");

    if (storedPassword === "gdma") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fix hydration by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && isClient) {
      loadDonations();
    }
  }, [isAuthenticated, isClient]);

  const loadDonations = async () => {
    try {
      const [donationsList, total] = await Promise.all([
        getDonations(),
        getTotalDonated()
      ]);
      setDonations(donationsList);
      setTotalDonated(total);
    } catch (error) {
      console.error("Error loading donations:", error);
      setMessage("Erro ao carregar doações");
    }
  };



  const handleAddDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      setMessage("Por favor, insira um valor válido");
      return;
    }

    setIsLoading(true);
    try {
      await addDonation({
        value: donationAmount,
        method,
        payer: payerName || ""
      });
      
      setAmount("");
      setPayerName("");
      setMessage("Doação adicionada com sucesso!");
      
      // Reload donations
      await loadDonations();
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error adding donation:", error);
      setMessage("Erro ao adicionar doação");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center py-10 px-4 ${libreBaskerville.className}`}>
        <div className="w-full max-w-md bg-white/20 backdrop-blur-sm rounded-lg shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--text-bronze)" }}>
            Painel Administrativo
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "var(--text-bronze)" }}>
                Senha:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Entrar
            </button>
          </form>
          
          {message && (
            <p className="mt-4 text-center text-red-600">{message}</p>
          )}
          
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
              Voltar para a página principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 px-4 ${libreBaskerville.className}`}
    >
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-sm rounded-lg shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--text-bronze)" }}
          >
            Painel Administrativo
          </h1>
          <Link
            href="/"
            className="inline-flex items-center px-3 py-2 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-600"
          >
            <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
            Voltar
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Donation Form */}
          <div className="bg-white/30 rounded-lg p-6">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "var(--text-bronze)" }}
            >
              Adicionar Doação
            </h2>

            <form onSubmit={handleAddDonation} className="space-y-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-bronze)" }}
                >
                  Valor (R$):
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  min="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="method"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-bronze)" }}
                >
                  Método de Pagamento:
                </label>
                <select
                  id="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PIX">PIX</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="payerName"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-bronze)" }}
                >
                  Nome do Doador (opcional):
                </label>
                <input
                  type="text"
                  id="payerName"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                {isLoading ? "Adicionando..." : "Adicionar Doação"}
              </button>
            </form>

            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("sucesso")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          {/* Donations Summary */}
          <div className="bg-white/30 rounded-lg p-6">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "var(--text-bronze)" }}
            >
              Resumo das Doações
            </h2>

            <div className="mb-6">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--accent-blue)" }}
              >
                R${" "}
                {totalDonated.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-gray-600">
                Total arrecadado ({donations.length} doações)
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {donations.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Nenhuma doação registrada
                </p>
              ) : (
                donations.map((donation) => (
                  <div key={donation.id} className="bg-white/50 rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">
                          R${" "}
                          {donation.value.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        <div className="text-sm text-gray-600">
                          {donation.method}
                          {donation.payer && ` • ${donation.payer}`}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(donation.created_at).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white/30 rounded-lg p-6 mt-8">
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--text-bronze)" }}
        >
          Todas as Doações
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-2 py-1">Valor</th>
                <th className="px-2 py-1">Método</th>
                <th className="px-2 py-1">Doador</th>
                <th className="px-2 py-1">Data</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Nenhuma doação registrada
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation.id} className="odd:bg-white/20">
                    <td className="px-2 py-1">
                      R${" "}
                      {donation.value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-2 py-1">{donation.method}</td>
                    <td className="px-2 py-1">{donation.payer || "-"}</td>
                    <td className="px-2 py-1">
                      {new Date(donation.created_at).toLocaleDateString(
                        "pt-BR"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}