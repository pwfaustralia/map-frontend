'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Table() {
  return (
    <div>
      <Card className="md:col-span-2 lg:col-span-3 order-2 lg:order-none border-gray-200 shadow-lg shadow-gray-300">
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] w-full">
            {[
              { id: '04', name: 'Elijah Whitworth', points: '52910' },
              { id: '05', name: 'Christian Mason', points: '49218' },
              { id: '06', name: 'Gabriella Hansen', points: '49210' },
              { id: '07', name: 'Willow Harrison', points: '48210' },
              { id: '08', name: 'Phoenix Evans', points: '43189' },
              { id: '09', name: 'Justin Nevin', points: '38917' },
              { id: '10', name: 'Elijah Whitworth', points: '38817' },
              { id: '11', name: 'Christian Mason', points: '37182' },
              { id: '12', name: 'Gabriella Hansen', points: '36198' },
              { id: '13', name: 'Willow Harrison', points: '35980' },
              { id: '14', name: 'Phoenix Evans', points: '34019' },
              { id: '15', name: 'Justin Nevin', points: '33187' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 w-6">{item.id}</span>
                  <span className="font-medium text-orange-500">User: {item.name}</span>
                </div>
                <div className="inline-flex space-x-3 justify-center align-middle items-center">
                  <p className="text-base text-gray-500">Total Points:</p>
                  <p className="border rounded-full py-1 px-3 text-sm bg-green-500 hover:bg-green-600 text-white border-none">
                    {item.points}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
