import "@/app/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className=" 
        w-screen
        min-h-screen 
        flex 
        justify-center 
        items-center 
        bg-gradient-to-r 
        from-rose-400  
        to-teal-400"
    >
      {children}
    </div>
  );
}
