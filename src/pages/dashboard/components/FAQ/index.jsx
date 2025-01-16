import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import { IoMdArrowDropright } from "react-icons/io";

const FAQAccordion = () => {
  // Sample FAQ data
  const items = [
    {
      uuid: 1,
      heading: "What is the return policy?",
      content: "We offer a 30-day return policy for all products. Items must be unused and in their original packaging.",
    },
    {
      uuid: 2,
      heading: "How do I track my order?",
      content: "Once your order has been shipped, you will receive an email with a tracking number and a link to track your shipment.",
    },
    {
      uuid: 3,
      heading: "What payment methods are accepted?",
      content: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
    },
    {
      uuid: 4,
      heading: "Can I modify my order after placing it?",
      content: "Once an order is placed, it cannot be modified. However, you can cancel your order within 24 hours and place a new one.",
    },
    {
      uuid: 5,
      heading: "Do you offer international shipping?",
      content: "Yes, we offer international shipping to select countries. Shipping fees and delivery times will vary depending on your location.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* FAQ Section Title */}
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Frequently Asked Questions</h2>

      {/* Accordion component for FAQs */}
      <Accordion allowZeroExpanded>
        {items.map((item) => (
          <AccordionItem key={item.uuid}>
            <AccordionItemHeading>
              {/* Accordion Button with hover and focus effects */}
              <AccordionItemButton className="w-full text-left py-4 px-6 flex justify-between items-center bg-indigo-100 hover:bg-indigo-200 focus:outline-none rounded-lg transition-all duration-300">
                <span className="text-lg font-medium text-gray-800">
                  {/* Arrow icon for collapsing and expanding */}
                  <span className="inline-block text-2xl text-indigo-600">
                    <IoMdArrowDropright />
                  </span> 
                  {item.heading}
                </span>
              </AccordionItemButton>
            </AccordionItemHeading>

            {/* Accordion Panel with content */}
            <AccordionItemPanel className="px-6 py-4 bg-indigo-50 rounded-lg shadow-inner">
              <p className="text-gray-700">{item.content}</p>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
