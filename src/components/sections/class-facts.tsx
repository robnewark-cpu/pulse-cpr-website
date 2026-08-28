import Link from "next/link"
import { Container } from "@/components/layout/container"
import { courses, siteConfig } from "@/lib/site"

export function ClassFacts({
  heading = "CPR class prices and hours in Edmond, Oklahoma",
}: {
  heading?: string
}) {
  const { address } = siteConfig

  return (
    <section
      className="border-y bg-white py-12 sm:py-16"
      aria-labelledby="class-facts-heading"
      data-speakable="true"
    >
      <Container>
        <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
          Prices, hours, and schedule
        </p>
        <h2 id="class-facts-heading" className="mt-2 text-3xl font-extrabold tracking-tight">
          {heading}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Pulse CPR Heartsaver CPR certification costs $75 in Edmond, OK. First Aid is $69, AED
          training is $59, and BLS Provider is $95. Corporate on-site training for six or more
          students is a custom quote. Public classes meet at {address.street}, {address.city},{" "}
          {address.region} {address.postalCode}.
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
          <div className="overflow-x-auto rounded-2xl ring-1 ring-navy/10">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <caption className="sr-only">
                Pulse CPR class prices in Edmond, Oklahoma
              </caption>
              <thead className="bg-accent/80 text-navy">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Class
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Duration
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Card
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.slug} className="border-t border-navy/10">
                    <th scope="row" className="px-4 py-3 font-medium text-navy">
                      <Link href={course.href} className="underline-offset-4 hover:underline">
                        {course.title}
                      </Link>
                    </th>
                    <td className="px-4 py-3">{course.price}</td>
                    <td className="px-4 py-3">{course.duration}</td>
                    <td className="px-4 py-3">{course.renewal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl bg-accent/60 p-6">
            <h3 className="text-lg font-bold text-navy">Edmond classroom hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-navy/85">
              {siteConfig.hours.map((item) => (
                <li key={item.day}>
                  <span className="font-semibold">{item.day}:</span> {item.time}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Public classes typically run weeknights and Saturdays. Open seats are posted on the{" "}
              <Link href="/class-calendar" className="font-semibold text-navy underline-offset-4 hover:underline">
                class calendar
              </Link>
              . Call{" "}
              <a href={siteConfig.phoneHref} className="font-semibold text-navy underline-offset-4 hover:underline">
                {siteConfig.phone}
              </a>{" "}
              for the next available date.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
