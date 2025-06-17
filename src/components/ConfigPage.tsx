"use client";

import { useState, useEffect } from "react";
import { addDonation, getDonations, type Donation } from "@/lib/donations";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const ADMIN_PASSWORD = "casorio2025"; // Simple hardcoded password

export default function ConfigPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  // Form states
  const [value, setValue] = useState("");
  const [method, setMethod] = useState("PIX");
  const [payer, setPayer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  
  // Donations list
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalDonated, setTotalDonated] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDonations();
    }
  }, [isAuthenticated]);

  const fetchDonations = async () => {
    try {
      const fetchedDonations = await getDonations();
      setDonations(fetchedDonations);
      const total = fetchedDonations.reduce((sum, donation) => sum + donation.value, 0);
      setTotalDonated(total);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Senha incorreta");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const donationValue = parseFloat(value);
      if (isNaN(donationValue) || donationValue <= 0) {
        setSubmitMessage("Por favor, insira um valor válido.");
        return;
      }

      await addDonation({
        value: donationValue,
        method,
        payer: payer.trim() || "Anônimo"
      });

      // Reset form
      setValue("");
      setMethod("PIX");
      setPayer("");
      setSubmitMessage("Doação adicionada com sucesso!");
      
      // Refresh donations list
      await fetchDonations();
    } catch (error) {
      console.error("Error adding donation:", error);
      setSubmitMessage("Erro ao adicionar doação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center py-10 px-4 ${libreBaskerville.className}`}>
        <div className="w-full max-w-md bg-white/20 shadow-2xl rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--text-bronze)" }}>
            Acesso Administrativo
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
              {authError && (
                <p className="mt-1 text-sm text-red-600">{authError}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Entrar
            </button>
          </form>
          
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
    <div className={`min-h-screen flex flex-col items-center py-10 px-4 ${libreBaskerville.className}`}>
      <div className="w-full max-w-4xl bg-white/20 shadow-2xl rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-bronze)" }}>
            Painel Administrativo
          </h1>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
          >
            <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Donation Form */}
          <div className="bg-white/35 rounded-lg p-6 border border-amber-100">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-bronze)" }}>
              Adicionar Nova Doação
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="value" className="block text-sm font-medium mb-2" style={{ color: "var(--text-bronze)" }}>
                  Valor (R$):
                </label>
                <input
                  type="number"
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  step="0.01"
                  min="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0,00"
                  required
                />
              </div>

              <div>
                <label htmlFor="method" className="block text-sm font-medium mb-2" style={{ color: "var(--text-bronze)" }}>
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
                <label htmlFor="payer" className="block text-sm font-medium mb-2" style={{ color: "var(--text-bronze)" }}>
                  Nome do Doador (opcional):
                </label>
                <input
                  type="text"
                  id="payer"
                  value={payer}
                  onChange={(e) => setPayer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do doador"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                {isSubmitting ? "Adicionando..." : "Adicionar Doação"}
              </button>

              {submitMessage && (
                <p className={`text-sm ${submitMessage.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>

          {/* Donations Summary */}
          <div className="bg-white/35 rounded-lg p-6 border border-amber-100">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-bronze)" }}>
              Resumo das Doações
            </h2>
            
            <div className="mb-6">
              <div className="text-3xl font-bold mb-2" style={{ color: "var(--accent-blue)" }}>
                R$ {totalDonated.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">
                Total arrecadado ({donations.length} doações)
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {donations.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhuma doação registrada ainda.</p>
              ) : (
                donations.map((donation) => (
                  <div key={donation.id} className="bg-white/50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">
                          R$ {donation.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm text-gray-600">
                          {donation.payer} • {donation.method}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(donation.created_at).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}