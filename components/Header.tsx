"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import OutLineFilmIcon from "@/Icons/outLineFilm.svg";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header style={{ height: '40px' }} className="bg-guru-teal text-guru-navy flex justify-between items-center w-full px-2 py-4">
      <div className="flex ">
        <Image className="flex-sta" src="/Icons/outLineFilm.svg" alt="Cinema Gurr Logo" width={25} height={25} />
        <p style={{ fontSize: '20px', fontWeight: 'bolder', paddingLeft: '4px' }} className="font-bold">
          Cinema Guru
        </p>
      </div>
      {session && session.user ? (
        <>
          <div className="flex items-center gap-4">
            <p style={{ fontSize: '15px', padding: '2px', marginRight: '10px' }}>
              Welcome, {session.user.email}
            </p>
            <button onClick={() => signOut()} className="flex items-center gap-2">
              <Image src="/Icons/signOut.svg" alt="Logout buttion" width={15} height={15} />
              <p style={{ fontSize: '15px', marginLeft: '3px', marginRight: '5px' }}>Logout</p>
            </button>
          </div>
        </>
      ) : (
        <button onClick={() => signIn("github")}>
          Sign in with Github
        </button>
      )}
    </header>
  )
}