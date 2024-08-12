import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-[512px,1fr] xl:min-h-[800px]">
      <div className="bg-primary lg:flex flex-col lg:pb-0 pb-[46px]">
        <div className="w-full h-full flex items-center justify-center lg:py-0 py-[46px]">
          <img src="/images/cc-logo.png" alt="Credit Connection" className="lg:w-[365px] w-[80%] max-w-[365px]" />
        </div>
        <div className="hidden w-full flex justify-center lg:block">
          <img src="/images/girl-on-the-bike.png" width="278" height="267" />
        </div>
      </div>
      <div className="flex items-center justify-center py-12 rounded-t-[41px] bg-white lg:mt-0 mt-[-46px] lg:px-0 px-[46px]">
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
        </div>
      </div>
    </div>
  );
}
