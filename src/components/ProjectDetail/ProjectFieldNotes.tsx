
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';

export const ProjectFieldNotes: React.FC = () => {
  const fieldNotes = [
    { id: 1, image: '/placeholder.svg', hasImage: true },
    { id: 2, image: '/placeholder.svg', hasImage: true },
    { id: 3, image: null, hasImage: false, text: 'No image available for this field note.' },
    { id: 4, image: '/placeholder.svg', hasImage: true },
    { id: 5, image: '/placeholder.svg', hasImage: true },
    { id: 6, image: '/placeholder.svg', hasImage: true },
  ];

  const mainNote = {
    date: '9/12/24',
    title: 'Test',
    author: 'Alec Lewis'
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-200">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-foreground font-semibold">Field Notes</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {fieldNotes.map((note) => (
            <div key={note.id} className="aspect-square relative group">
              {note.hasImage ? (
                <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center border border-border hover:border-primary/20 transition-all duration-200 cursor-pointer group-hover:shadow-md">
                  <Camera className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ) : (
                <div className="w-full h-full bg-muted/50 rounded-lg flex items-center justify-center p-2 border border-border">
                  <div className="text-xs text-center text-muted-foreground">
                    {note.text}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-lg shadow-sm">
          <div className="text-sm font-medium opacity-90">{mainNote.date}</div>
          <div className="font-bold text-lg">{mainNote.title}</div>
          <div className="text-sm opacity-75">{mainNote.author}</div>
        </div>
      </CardContent>
    </Card>
  );
};
