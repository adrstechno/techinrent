import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/quer";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
export default function AccountDetail({
  accountId,
  isOpen,
  onClose
}) {
  const { toast } = useToast();
  const [rentalPeriod, setRentalPeriod] = useState({
    startDate: new Date().toISOString().split('T')[0],
    duration: "1 Week",
  });
  const [selectedPrice, setSelectedPrice] = useState("weekly");

  // Query the account data
  const {
    data: account,
    isLoading,
    error
  } = useQuery({
    queryKey: ["account", accountId],
    queryFn: () => apiRequest('GET', `/api/accounts/${accountId}`),
    enabled: !!accountId && isOpen,
  });
  const handleRentalOptionChange = (option) => {
    setSelectedPrice(option);
  };

  const handleRentNow = async () => {
    try {
      await apiRequest('POST', '/api/rentals', {
        accountId: accountId,
        rentalPeriod: rentalPeriod,
        pricingOption: selectedPrice
      });
      toast({
        title: "Rental Successful",
        description: "Your account rental has been confirmed!",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Rental Failed",
        description: "There was an error processing your rental. Please try again.",
        variant: "destructive"
      });
    }
  };

  const calculateTotal = () => {
    if (!account) return 0;
    let basePrice = 0;
    if (selectedPrice === "daily") basePrice = account.dailyPrice;
    else if (selectedPrice === "weekly") basePrice = account.weeklyPrice;
    else basePrice = account.monthlyPrice;
    const serviceFee = Math.round(basePrice * 0.1);
    return basePrice + serviceFee;
  };

  // Determine displayed price based on selection
  const displayedPrice = account ? (
    selectedPrice === "daily" ? account.dailyPrice :
    selectedPrice === "weekly" ? account.weeklyPrice : account.monthlyPrice
  ) : 0;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {isLoading ? <Skeleton className="h-8 w-72" /> : account?.title}
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 text-neutral-dark hover:text-neutral">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        {isLoading ? (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-16 w-full mb-6" />
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-6 w-36 mb-3" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="space-y-4 mb-6">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
                <Skeleton className="h-6 w-40 mb-3" />
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full" />
                  ))}
                </div>
                <Skeleton className="h-36 w-full mb-6" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-destructive">Error loading account details. Please try again later.</p>
          </div>
        ) : account ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-inter font-semibold text-lg mb-2">Account Overview</h3>
                <p className="text-neutral-dark mb-4">
                  A {account.type?.toLowerCase()} LinkedIn account with extensive connections in the {account.industry?.toLowerCase()} sector,
                  ideal for B2B outreach and networking within the {account.industry?.toLowerCase()} industry.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-neutral-dark">Industry</p>
                    <p className="font-medium">{account.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-dark">Connections</p>
                    <p className="font-medium">{account.connections?.toLocaleString()}+</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-dark">Account Age</p>
                    <p className="font-medium">{account.accountAge} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-dark">SSI Score</p>
                    <p className="font-medium">{account.ssiScore}/100</p>
                  </div>
                  {account.premiumType && (
                    <div>
                      <p className="text-sm text-neutral-dark">Premium Type</p>
                      <p className="font-medium">{account.premiumType}</p>
                    </div>
                  )}
                  {account.endorsements && (
                    <div>
                      <p className="text-sm text-neutral-dark">Endorsements</p>
                      <p className="font-medium">{account.endorsements}+</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="font-inter font-semibold text-lg mb-2">Key Features</h3>
                  <ul className="space-y-2 text-neutral-dark">
                    {account.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-success mt-1 mr-2 h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-inter font-semibold text-lg mb-2">Rental Options</h3>
                <div className="space-y-4">
                  <RadioGroup value={selectedPrice} onValueChange={(value) => handleRentalOptionChange(value)}>
                    <div className={`border rounded-lg p-4 hover:bg-neutral-50 ${selectedPrice === 'daily' ? 'bg-neutral-light border-primary' : ''}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="daily" id="daily" />
                          <Label htmlFor="daily" className="font-medium">
                            Daily Rental
                            <p className="text-neutral-dark text-sm">Best for quick campaigns</p>
                          </Label>
                        </div>
                        <p className="text-xl font-inter font-bold text-primary">
                          {formatCurrency(account.dailyPrice)}
                          <span className="text-sm font-normal">/day</span>
                        </p>
                      </div>
                    </div>

                    <div className={`border rounded-lg p-4 hover:bg-neutral-50 ${selectedPrice === 'weekly' ? 'bg-neutral-light border-primary' : ''}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly" className="font-medium">
                            Weekly Rental
                            <p className="text-neutral-dark text-sm">Most popular option</p>
                          </Label>
                        </div>
                        <p className="text-xl font-inter font-bold text-primary">
                          {formatCurrency(account.weeklyPrice)}
                          <span className="text-sm font-normal">/week</span>
                        </p>
                      </div>
                    </div>

                    <div className={`border rounded-lg p-4 hover:bg-neutral-50 ${selectedPrice === 'monthly' ? 'bg-neutral-light border-primary' : ''}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="font-medium">
                            Monthly Rental
                            <p className="text-neutral-dark text-sm">Best value for longer projects</p>
                          </Label>
                        </div>
                        <p className="text-xl font-inter font-bold text-primary">
                          {formatCurrency(account.monthlyPrice)}
                          <span className="text-sm font-normal">/month</span>
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="mb-6">
                  <h3 className="font-inter font-semibold text-lg mb-2">Select Rental Period</h3>
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-sm font-medium text-neutral-dark mb-1">Start Date</Label>
                        <Input
                          type="date"
                          value={rentalPeriod.startDate}
                          onChange={(e) => setRentalPeriod({ ...rentalPeriod, startDate: e.target.value })}
                          className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-neutral-dark mb-1">Duration</Label>
                        <Select
                          value={rentalPeriod.duration}
                          onValueChange={(value) => setRentalPeriod({ ...rentalPeriod, duration: value })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 Week">1 Week</SelectItem>
                            <SelectItem value="2 Weeks">2 Weeks</SelectItem>
                            <SelectItem value="1 Month">1 Month</SelectItem>
                            <SelectItem value="Custom Period">Custom Period</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-light rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">
                      {selectedPrice === "daily" ? "Daily" : selectedPrice === "weekly" ? "Weekly" : "Monthly"} Rental
                    </p>
                    <p className="font-medium">{formatCurrency(displayedPrice)}</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Service Fee</p>
                    <p className="font-medium">{formatCurrency(Math.round(displayedPrice * 0.1))}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t mt-2">
                    <p className="font-bold">Total</p>
                    <p className="font-bold text-primary text-xl">{formatCurrency(calculateTotal())}</p>
                  </div>
                </div>

                <Button
                  onClick={handleRentNow}
                  className="w-full bg-primary hover:bg-primary-dark text-white"
                >
                  Rent Now
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

