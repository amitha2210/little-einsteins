const layout = ({ children }) => {
  return (
    <main className="flex h-screen">
        {children}
        <div className="hidden lg:block w-full bg-[#EAF2F8]">
        Insert something here
        </div>    
    </main>
  )
}

export default layout