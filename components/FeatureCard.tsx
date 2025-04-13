import { motion } from "framer-motion";
import { Leaf, Truck, Shield, Users } from "lucide-react"; // Or your custom icons
import { cn } from "@/lib/utils"; // Assuming you have a utils file with a cn function for class names

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string; // Use string to select icon
}

const iconMap: Record<string, React.ReactNode> = {
  "Leaf": <Leaf className="h-8 w-8 text-green-600" />,
  "Truck": <Truck className="h-8 w-8 text-blue-600" />,
  "Shield": <Shield className="h-8 w-8 text-red-600" />,
  "Users": <Users className="h-8 w-8 text-purple-600" />,
  // Add mappings for any custom SVGs here
};


<motion.div
  // ... other props
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  whileHover="hover"
>
  {/* ... card content */}
</motion.div>

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, iconName }) => {
  const icon = iconMap[iconName] || <Leaf className="h-8 w-8 text-gray-600" />; // Default icon

  return (
    <motion.div
      className={cn(
        "bg-background rounded-lg p-6 hover:scale-105 transition-transform duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
      tabIndex={0}
      role="article"
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
