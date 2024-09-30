import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const yodleeLoginData = [
    { siteName: 'Dag Site', login: 'YodTest.site16441.2', password: 'site16441.2', mfa: 'None' },
    {
      siteName: 'Dag Site Multilevel',
      login: 'YodTest.site16442.1',
      password: 'site16442.1',
      mfa: 'One Time Password: Choose Any Delivery Method (nothing is sent) When prompted enter: 123456',
    },
    {
      siteName: 'Dag Site SecurityQA',
      login: 'YodTest.site16486.1',
      password: 'site16486.1',
      mfa: 'Challenge Questions: Answer 1: w3schools, Answer 2: Texas',
    },
    { siteName: 'Dag OAuth (US Demo)', login: 'YodTest2.site19335.1', password: 'site19335.1', mfa: 'None' },
    { siteName: 'CDR Sandbox (Australia Demo)', login: 'jwilson (or) ksmith', password: '000789', mfa: 'None' },
    { siteName: 'Modelo (UK Demo)', login: 'mits', password: 'mits', mfa: 'None' },
  ];
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-[512px,1fr] xl:min-h-[800px] h-screen overflow-auto">
      <div className="bg-primary lg:flex flex-col lg:pb-0 pb-[46px]">
        <div className="w-full h-full flex items-center justify-center lg:py-0 py-[46px]">
          <img src="/images/cc-logo.png" alt="Credit Connection" className="lg:w-[365px] w-[80%] max-w-[365px]" />
        </div>
        <div className="hidden w-full justify-center lg:flex">
          <Image src="/images/girl-on-the-bike.png" alt="CC" width="278" height="267" />
        </div>
      </div>
      <div className="flex items-start justify-center py-12 pt-[150px] rounded-t-[41px] bg-white lg:mt-0 mt-[-46px] lg:px-0 px-[46px] overflow-auto">
        <div className="mx-auto grid w-[522px] gap-9">
          <div className="grid gap-2">
            <h1 className="lg:text-5xl text-3xl">Welcome to your</h1>
            <h1 className="lg:text-5xl text-3xl font-bold text-accent">Mortgage Action Plan</h1>
          </div>
          {children}
          <div className="mt-12 text-center text-base text-grey font-extralight">
            Forgot your password?&nbsp;
            <Link href="#" className="text-accent font-semibold" prefetch={false}>
              Reset Password
            </Link>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl">How to test?</AccordionTrigger>
              <AccordionContent className="pl-4">
                <ol className="list-decimal ml-4 text-lg">
                  <li>
                    Login as admin. <br />
                    <b>Email</b>: hello@pwf.com.au
                  </li>
                  <li>
                    Create a client
                    <ol className="list-disc ml-4 text-lg">
                      <li>
                        <i>
                          Fill out First Name, Last Name, Middle Name, Preferred Name, Email, Password, and Yodlee
                          Username.
                        </i>
                        <br />
                        <span className="text-destructive font-bold">*** Allowed Yodlee usernames ***</span>
                        <br /> sbMem659b97ec54c7a1
                        <br /> sbMem659b97ec54c7a2
                        <br /> sbMem659b97ec54c7a3
                        <br /> sbMem659b97ec54c7a4
                        <br />
                        sbMem659b97ec54c7a5
                      </li>
                    </ol>
                  </li>
                  <li>Log out after successfully creating a client.</li>
                  <li>Sign in as client user.</li>
                  <li>Go to My Account tab.</li>
                  <li>
                    Click <Button>Connect Account</Button> button
                  </li>
                  <li>Search any of the provider below.</li>
                </ol>
                <Table className="mt-5">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provider Name</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead>MFA Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yodleeLoginData.map(({ siteName, login, mfa, password }) => (
                      <TableRow key={siteName}>
                        <TableCell>{siteName}</TableCell>
                        <TableCell>{login}</TableCell>
                        <TableCell>{password}</TableCell>
                        <TableCell>{mfa}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
