
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
    <Card>
      <CardHeader>
        <CardTitle>Field Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {fieldNotes.map((note) => (
            <div key={note.id} className="aspect-square relative">
              {note.hasImage ? (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center p-2">
                  <div className="text-xs text-center text-gray-500">
                    {note.text}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <div className="text-sm font-medium">{mainNote.date}</div>
          <div className="font-bold">{mainNote.title}</div>
          <div className="text-sm text-gray-300">{mainNote.author}</div>
        </div>
      </CardContent>
    </Card>
  );
};
