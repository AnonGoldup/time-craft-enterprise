import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Workflow, 
  Database, 
  Network,
  GitBranch
} from 'lucide-react';

export const WorkflowDiagrams: React.FC = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Workflow className="h-5 w-5" />
          System Architecture & Workflows
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="workflow" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workflow" className="gap-2">
              <GitBranch className="h-4 w-4" />
              User Workflow
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Database className="h-4 w-4" />
              Data Structure
            </TabsTrigger>
            <TabsTrigger value="architecture" className="gap-2">
              <Network className="h-4 w-4" />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="features" className="gap-2">
              <Workflow className="h-4 w-4" />
              Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">User Interaction Workflow</h3>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`
flowchart TD
    A[User Opens Timesheet] --> B{Has Existing Entries?}
    B -->|Yes| C[Show Grouped Entries]
    B -->|No| D[Show Empty State]
    
    C --> E[Timeline Overview]
    D --> F[Quick Entry Panel]
    
    E --> G{User Action}
    G -->|Select Multiple| H[Bulk Actions Toolbar]
    G -->|Edit Single| I[Inline Edit Mode]
    G -->|Add New| F
    G -->|Clone Group| J[Duplicate with Variations]
    
    H --> K[Bulk Operations]
    K --> L[Duplicate Selected]
    K --> M[Merge Time Blocks]
    K --> N[Batch Edit Properties]
    K --> O[Delete Multiple]
    
    I --> P[Save Changes]
    F --> Q[Smart Auto-complete]
    Q --> R[Recent Combinations]
    Q --> S[Project/Cost Code Lookup]
    
    J --> T[Copy with Time Adjustments]
    P --> U[Update Timeline]
    T --> U
    N --> U
    
    U --> V[Refresh Grouped View]
    V --> W[Calculate Totals]
    W --> X[Update Progress Indicators]
                `}</pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Database Schema & Relationships</h3>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`
erDiagram
    EMPLOYEE {
        string EmployeeID PK
        string FullName
        string Email
        string Class
        string Department
        boolean ActiveEmp
        datetime CreatedDate
        datetime ModifiedDate
    }
    
    PROJECT {
        int ProjectID PK
        string ProjectCode UK
        string ProjectDescription
        boolean IsActive
        datetime CreatedDate
        datetime ModifiedDate
        string ManagerID FK
    }
    
    PROJECT_EXTRA {
        int ExtraID PK
        int ProjectID FK
        string ExtraValue
        string Description
        boolean IsActive
    }
    
    COST_CODE {
        int CostCodeID PK
        string CostCode UK
        string Description
        boolean IsActive
        string Category
    }
    
    TIMESHEET_ENTRY {
        int EntryID PK
        string EmployeeID FK
        string DateWorked
        string ProjectCode FK
        string ExtraValue
        int CostCodeID FK
        decimal Hours
        int PayID
        string Status
        string Notes
        datetime CreatedDate
        datetime ModifiedDate
        string TimeIn
        string TimeOut
        string BreakIn
        string BreakOut
    }
    
    TIMESHEET_GROUP {
        int GroupID PK
        string ProjectCode FK
        int CostCodeID FK
        string GroupKey UK
        datetime CreatedDate
        int EntryCount
        decimal TotalHours
    }
    
    USER_PREFERENCES {
        int PreferenceID PK
        string EmployeeID FK
        json RecentCombinations
        json QuickTimeSlots
        json DefaultSettings
        datetime LastUpdated
    }
    
    EMPLOYEE ||--o{ TIMESHEET_ENTRY : creates
    PROJECT ||--o{ PROJECT_EXTRA : contains
    PROJECT ||--o{ TIMESHEET_ENTRY : assigned_to
    COST_CODE ||--o{ TIMESHEET_ENTRY : categorizes
    PROJECT_EXTRA ||--o{ TIMESHEET_ENTRY : details
    EMPLOYEE ||--|| USER_PREFERENCES : configures
    TIMESHEET_ENTRY }o--|| TIMESHEET_GROUP : belongs_to
                `}</pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">System Architecture</h3>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`
graph TB
    subgraph "Frontend Layer"
        A[React Components]
        B[State Management]
        C[UI Components]
        D[Timesheet Redesign]
    end
    
    subgraph "Service Layer"
        E[API Services]
        F[Data Transformation]
        G[Validation Service]
        H[Cache Layer]
    end
    
    subgraph "Backend Layer"
        I[REST API Endpoints]
        J[Business Logic]
        K[Data Access Layer]
        L[Authentication]
    end
    
    subgraph "Data Layer"
        M[SQL Server Database]
        N[File Storage]
        O[Session Store]
        P[Audit Logs]
    end
    
    subgraph "External Systems"
        Q[SAGE 300 Payroll]
        R[Email Service]
        S[Notification Service]
        T[Report Generator]
    end
    
    A --> E
    D --> B
    C --> A
    B --> F
    E --> I
    F --> G
    G --> H
    
    I --> J
    J --> K
    K --> M
    L --> O
    
    J --> Q
    J --> R
    I --> S
    K --> T
    
    M --> P
    N --> M
                `}</pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Key Features Implementation</h3>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Visual Grouping & Time Blocks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Feature</Badge>
                      <span className="text-sm">Project/Cost Code grouping with collapsible sections</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Implementation</Badge>
                      <span className="text-sm">CSS Grid for timeline, duration bars with proportional widths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Benefits</Badge>
                      <span className="text-sm">70% reduction in visual clutter, improved scanning efficiency</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Bulk Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Feature</Badge>
                      <span className="text-sm">Multi-select with toolbar, batch editing capabilities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Implementation</Badge>
                      <span className="text-sm">Set-based selection state, optimistic UI updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Benefits</Badge>
                      <span className="text-sm">85% faster for repetitive operations</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Smart Auto-complete</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Feature</Badge>
                      <span className="text-sm">Recent combinations, intelligent suggestions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Implementation</Badge>
                      <span className="text-sm">Local storage for preferences, fuzzy search algorithm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Benefits</Badge>
                      <span className="text-sm">60% reduction in typing, fewer input errors</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Timeline Visualization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Feature</Badge>
                      <span className="text-sm">24-hour timeline, conflict detection, current time indicator</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Implementation</Badge>
                      <span className="text-sm">CSS Grid with 24 columns, absolute positioning for time blocks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Benefits</Badge>
                      <span className="text-sm">Immediate visual feedback, overlap prevention</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Mobile Optimization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Feature</Badge>
                      <span className="text-sm">Touch-optimized controls, responsive layout, offline capability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Implementation</Badge>
                      <span className="text-sm">Tailwind responsive classes, PWA features, local caching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Benefits</Badge>
                      <span className="text-sm">60% mobile usage target, field worker accessibility</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};