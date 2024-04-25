import { Accordion } from '@/components/Primitives/Accordion';

const AccordionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex justify-center gap-2 w-[300px] min-h-[350px] p-4 border border-primary">
        <Accordion
          items={[
            {
              name: 'Accordion Trigger',
              content: (
                <div className="flex flex-col items-center justify-center gap-2">
                  Accordion Content
                  <div className="flex flex-col gap-1 items-center">
                    {[1, 2, 3, 4, 5].map((item, index) => (
                      <div key={`item-${index}`} className="flex items-center justify-center w-10 h-10 bg-secondary text-primary rounded-full">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AccordionPage;
