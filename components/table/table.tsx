import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HoverCardDemo } from "../hoverCard";

const invoices = [
  {
    title: "Dashboard",
    data: "2024",
    description: "Monitoramento em Tempo Real com Consumo de APIs.",
    deploy: 'https://dashboard-codeui.vercel.app/',
    img: "https://cdn.discordapp.com/attachments/1179982136015589477/1198843462280286300/Default.png?ex=65c060fa&is=65adebfa&hm=618ad9d87ea21332b9fee2d94e0329fe30f86bde9ecfa580f5061b55a5380190&",
  },
  {
    title: "Queota.skin",
    data: "2023",
    description: "Compre, venda e troque skins de maneira descomplicada.",
    deploy: 'https://queota-skin-erf6uuaos-viiict0r.vercel.app/',
    img: "https://cdn.discordapp.com/attachments/1059174040767561838/1199505836532318308/image.png?ex=65c2c9dd&is=65b054dd&hm=64d37bcdabaf20fafb5f09581a8971d2b259ee2a963655bac37f790cab6ed88f&",

  },
];

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>DATA</TableHead>
          <TableHead className="w-[100px]">WEBSITE</TableHead>
          <TableHead>DESCRIPTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        {invoices.map((invoice, index) => (
          <TableRow key={invoice.title} data-index={index}>
           <TableCell key={invoice.data}>{invoice.data}</TableCell>
            <TableCell className="font-medium">
              <HoverCardDemo
                href={invoice.deploy}
                image={invoice.img}
                name={invoice.title}
              />
            </TableCell>
            <TableCell>{invoice.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
