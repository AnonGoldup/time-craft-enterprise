
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CompanyDetailsSection: React.FC = () => {
  return (
    <Card className="enhanced-card">
      <CardHeader className="enhanced-header rounded-t-lg">
        <CardTitle>Company Information</CardTitle>
        <CardDescription className="text-white/90">Basic company details and contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" defaultValue="AltaPro Electric Ltd" className="enhanced-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine1">Address (line 1)</Label>
            <Input id="addressLine1" defaultValue="13415 149 Street" className="enhanced-input" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address (line 2)</Label>
            <Input id="addressLine2" placeholder="Suite, unit, etc." className="enhanced-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="county">County</Label>
            <Input id="county" defaultValue="AB" className="enhanced-input" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" defaultValue="Edmonton" className="enhanced-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stateProvince">State / Province</Label>
            <Input id="stateProvince" defaultValue="AB" className="enhanced-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">ZIP / Postal Code</Label>
            <Input id="postalCode" defaultValue="T5L2T3" className="enhanced-input" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" defaultValue="Canada" className="enhanced-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue="780-444-6510" className="enhanced-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fax">Fax</Label>
            <Input id="fax" defaultValue="780-483-4073" className="enhanced-input" />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};
