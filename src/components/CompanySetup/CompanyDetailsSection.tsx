
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CompanyDetailsSection: React.FC = () => {
  return (
    <Card className="bg-card border-border hover:shadow-md transition-all duration-200 enhanced-card">
      <CardHeader className="enhanced-header rounded-t-xl">
        <CardTitle className="text-primary-foreground">Company Information</CardTitle>
        <CardDescription className="text-primary-foreground/90">Basic company details and contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Company Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium text-foreground">Company Name</Label>
            <Input 
              id="companyName" 
              defaultValue="AltaPro Electric Ltd" 
              className="enhanced-input" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine1" className="text-sm font-medium text-foreground">Address (line 1)</Label>
            <Input 
              id="addressLine1" 
              defaultValue="13415 149 Street" 
              className="enhanced-input" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="addressLine2" className="text-sm font-medium text-foreground">Address (line 2)</Label>
            <Input 
              id="addressLine2" 
              placeholder="Suite, unit, etc." 
              className="enhanced-input" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="county" className="text-sm font-medium text-foreground">County</Label>
            <Input 
              id="county" 
              defaultValue="AB" 
              className="enhanced-input" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-foreground">City</Label>
            <Input 
              id="city" 
              defaultValue="Edmonton" 
              className="enhanced-input" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stateProvince" className="text-sm font-medium text-foreground">State / Province</Label>
            <Input 
              id="stateProvince" 
              defaultValue="AB" 
              className="enhanced-input" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-sm font-medium text-foreground">ZIP / Postal Code</Label>
            <Input 
              id="postalCode" 
              defaultValue="T5L2T3" 
              className="enhanced-input" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium text-foreground">Country</Label>
            <Input 
              id="country" 
              defaultValue="Canada" 
              className="enhanced-input" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</Label>
            <Input 
              id="phone" 
              defaultValue="780-444-6510" 
              className="enhanced-input" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fax" className="text-sm font-medium text-foreground">Fax</Label>
            <Input 
              id="fax" 
              defaultValue="780-483-4073" 
              className="enhanced-input" 
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-6 border-t border-border">
          <Button 
            variant="outline" 
            className="px-6 py-2 text-sm font-medium border-border hover:bg-muted transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button 
            className="px-6 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
