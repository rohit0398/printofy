import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import CustomLink from "./customLink";

export function SocialLinks() {
  return (
    <>
      <div className=" flex gap-2 items-center">
        <EnvelopeIcon className="h-6 w-6 inline-block animate-bounce" />
        <CustomLink
          href={"mailto:hello@aumnix.co.in"}
          text={"hello@aumnix.co.in"}
          className={`text-white hover:scale-[1.05] text-xl font-medium`}
        ></CustomLink>
      </div>
      <div className=" flex gap-2 items-center">
        <PhoneIcon className="h-6 w-6 inline-block animate-bounce" />
        <CustomLink
          href={"tel:+91-9653650123"}
          text={"+91-9653650123"}
          className={`text-white hover:scale-[1.05] text-xl font-medium`}
        ></CustomLink>
      </div>
    </>
  );
}
