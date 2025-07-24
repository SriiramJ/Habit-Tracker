import { Card } from "@/components/ui/Card";
import { GearIcon } from "@radix-ui/react-icons";

const tools = [
  { href: "/tools/bmi", label: "BMI Calculator" },
  { href: "/tools/bmr", label: "BMR Calculator" },
  { href: "/tools/dailycalories", label: "Daily Calories" },
  { href: "/tools/idealweight", label: "Ideal Weight" },
  { href: "/tools/stopwatch", label: "Stopwatch" },
  { href: "/tools/timer", label: "Timer" },
  
];

export default function ToolsQuickAccess() {
  return (
    <section>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <GearIcon className="text-gray-500 w-5 h-5" /> Tools
      </h3>
      <Card>
        <ul className="space-y-2">
          {tools.map((tool) => (
            <li key={tool.href}>
              <a
                href={tool.href}
                className="text-blue-600 hover:underline font-medium"
              >
                {tool.label}
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}