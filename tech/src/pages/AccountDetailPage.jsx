import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountDetail from "@/components/AccountDetail";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import SchemaOrg from "@/components/SchemaOrg";

export default function AccountDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useLocation();
  const [isDetailOpen, setIsDetailOpen] = useState(true);
  const accountId = parseInt(id, 10);
  const { data: account, isLoading, error } = useQuery({ queryKey: ["account", accountId] });

  useEffect(() => {
    if (!isDetailOpen) {
      setLocation("/");
    }
  }, [isDetailOpen, setLocation]);

  const generateSeoMetadata = () => {
    if (!account) return null;
    const title = `${account.type} LinkedIn Account - ${account.industry} | TechInRent`;
    const description = `Rent this ${account.type} LinkedIn account with ${account.connections} connections in the ${account.industry} industry. ${account.accountAge} years old with SSI Score of ${account.ssiScore}.`;
    const keywords = `linkedin account rental, ${account.type} linkedin account, ${account.industry} industry, ${account.connections} connections, social selling index ${account.ssiScore}`;
    return (
      <>
        <SEO
          title={title}
          description={description}
          keywords={keywords}
          type="product"
          image={account.imageUrl}
        />
        <SchemaOrg type="Product" data={account} />
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {account && generateSeoMetadata()}
      <Navbar />
      <main className="flex-grow bg-neutral-light flex items-center justify-center p-4">
        {isLoading ? (
          <p className="text-center py-8">Loading account details...</p>
        ) : error ? (
          <div className="text-center py-8">
            <h2 className="font-heading text-2xl font-bold mb-4 tracking-tight">Account Not Found</h2>
            <p className="mb-6">We couldn't find the account you're looking for.</p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-primary hover:bg-primary-dark"
            >
              Go Back
            </Button>
          </div>
        ) : (
          <AccountDetail
            accountId={accountId}
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}