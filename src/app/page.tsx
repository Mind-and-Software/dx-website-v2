import Image from "next/image";
import HeroPic from "../../public/aboutPageBg.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 px-8 pb-8 max-w-[1200px]">
      <h2 className="font-semibold text-3xl">About us</h2>
      <Image src={HeroPic} alt="hero" />
      <div className="bg-blue-100 p-4 ">
        <p>
          This site is built by researchers in the Mind and Software research
          group at Aalto University, Finland. We are passionate about our
          research on understanding software developers. Many of us are or have
          been software developers ourselves.
        </p>
      </div>
      <p>
        Increasingly, software development tools and platforms stand out for the
        Developer Experience they promote. The way software development is
        organised is also started to get recognised as a factor contributing to
        Developer Experience. Developers intuitively know what they like and
        what they do not like, but it can be hard to pin down why. Designing for
        good Developer Experience is not very common, and how it links to user,
        company, and societal goals is not well understood. We think Developer
        Experience should be examined in scientific research to gain a greater
        understanding of what drives good experiences for developers, how to
        design for good Developer Experience, and how to link it with
        experiences that others have.
      </p>
      <p>
        The aim of this site is to create a fun, meaningful, and safe space
        where developers can share their experiences with other developers,
        learn about the science behind Developer Experience, and connect with
        researchers who study Developer Experience.
      </p>
      <p>
        <b>Your data is safe with us.</b> Our scientific mission depends on
        doing things ethically. As a participant, you always control what you
        share and what you keep private. We do not collect any data from you
        without your permission. We do not share your data with anyone unless
        you have chosen to do so. We treat your data securely and privately. You
        can choose to share some data only with us for research purposes. In
        this case, we will protect your anonymity. When we report research
        results, we only report aggregate data and it will not be possible to
        identify your personal details or answers. You can also choose to share
        some data publically. In that case, we always make it clear that you are
        sending something for all to see.
      </p>
      <b>Contact via email: info@devxlab.org</b>
    </main>
  );
}
