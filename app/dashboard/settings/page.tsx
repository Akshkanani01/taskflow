export default function Page() {
return ( <div
   className="
     flex min-h-[70vh]
     items-center
     justify-center
   "
 > <div
     className="
       max-w-lg
       rounded-3xl
       border border-white/10
       bg-slate-900
       p-10
       text-center
     "
   > <div
       className="
         mx-auto mb-6
         flex h-16 w-16
         items-center
         justify-center
         rounded-2xl
         bg-indigo-600/20
         text-3xl
       "
     >
🚀 </div>


    <h1 className="text-3xl font-bold text-white">
      Coming Soon
    </h1>

    <p className="mt-4 text-slate-400">
      This module is currently under development.
      It will be available in the next update.
    </p>

    <div
      className="
        mt-8
        rounded-2xl
        border border-indigo-500/20
        bg-indigo-500/10
        p-4
        text-sm
        text-indigo-300
      "
    >
      Enterprise feature in progress...
    </div>
  </div>
</div>


);
}
