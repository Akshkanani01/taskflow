import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is TaskFlow completely free?",
    answer:
      "Yes. TaskFlow is 100% free to use with unlimited projects and tasks.",
  },
  {
    question: "Can I invite my team members?",
    answer:
      "Absolutely. You can collaborate with your entire team inside one workspace.",
  },
  {
    question: "Do I need a credit card?",
    answer:
      "No. There are no hidden charges and no credit card required.",
  },
  {
    question: "Can I track project progress?",
    answer:
      "Yes. TaskFlow provides dashboards, analytics and project tracking tools.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your data is protected using industry-standard security practices.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-32"
    >
      <div className="container mx-auto max-w-4xl px-6">
        <div className="mb-20 text-center">
          <p
            className="text-sm uppercase tracking-[0.3em]"
            style={{ color: "var(--primary)" }}
          >
            FAQ
          </p>

          <h2 className="mt-4 text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Everything you need to know about TaskFlow.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="
                rounded-2xl
                border
                border-border
                bg-card
                px-6
              "
            >
              <AccordionTrigger className="text-left text-lg text-foreground">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}