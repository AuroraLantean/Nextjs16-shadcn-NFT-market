import Card from "@/components/Card";
import CardImage from "@/components/CardImage";

export default function Home() {
  return (
    <div>
      <Card variant="default" size="small">
        <CardImage></CardImage>
        <h1>NFT Name</h1>
        <p>NFT description. Price: $999</p>
      </Card>
    </div>
  );
}
