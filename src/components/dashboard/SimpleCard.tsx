import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SimpleCard({
  title,
  number,
  icon: Icon,
  subtitle,
}: {
  title: string;
  number?: number;
  icon: React.ElementType;
  subtitle?: string;
}) {
  return (
    <Card x-chunk="dashboard-05-chunk-1" className="flex-1">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardDescription>{title}</CardDescription>
          <Icon className="text-2xl text-muted-foreground" />
        </div>
        <CardTitle className="text-4xl">{number}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </CardContent>
      {/* <CardFooter>
         <Progress value={25} aria-label="25% increase" /> 
      </CardFooter> */}
    </Card>
  );
}
