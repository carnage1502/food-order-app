import Hero from "@/components/Hero";
import HomeMenu from "@/components/HomeMenu";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeader subHeader={"Our Story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
            esse voluptatem. Dolor porro et nostrum sed corrupti incidunt
            provident nobis ex ipsam, consequuntur, deserunt quibusdam facere
            sit. In, soluta quos?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
            esse voluptatem. Dolor porro et nostrum sed corrupti incidunt
            provident nobis ex ipsam, consequuntur, deserunt quibusdam facere
            sit. In, soluta quos?
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeader subHeader={"Don't hesitate"} mainHeader={"Contact us"} />
        <div className="mt-8">
          <Link
            href={"tel:+16969696"}
            className="text-4xl underline text-gray-500"
          >
            +1 6969 6969
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
