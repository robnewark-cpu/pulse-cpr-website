export const site = {
  name: "Pulse CPR",
  tagline: "Learn It. Know It. Save A Life.",
  url: "https://pulsecprok.com",
  phone: "(405) 763-6811",
  phoneHref: "tel:+14057636811",
  email: "contact@pulsecprok.com",
  address: "1019 Waterwood Pkwy, Ste C, Edmond, OK 73034",
  mapsUrl:
    "https://maps.apple.com/?q=1019%20Waterwood%20Pkwy%20Ste%20C%2C%20Edmond%2C%20OK%2073034",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=1019+Waterwood+Pkwy+Ste+C,+Edmond,+OK+73034",
  facebook: "https://www.facebook.com/profile.php?id=61572683277410",
  hours: [
    { day: "Monday–Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 2:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
} as const

export const classes = [
  {
    title: "Basic Life Support",
    price: "$95.00",
    duration: "3 to 4 hours",
    description:
      "For healthcare providers who need current BLS cards for work, school, or credentialing.",
    href: "/healthcare-provider-courses",
    image: require("../assets/images/basic-life-support.jpg"),
  },
  {
    title: "Heartsaver",
    price: "$95.00",
    duration: "4 to 5 hours",
    description:
      "CPR for workplaces, schools, childcare, and community responders, including child and infant skills.",
    href: "/cpr-certification",
    image: require("../assets/images/heartsaver.jpg"),
  },
  {
    title: "AED Training",
    price: "$59",
    duration: "2 hours",
    description: "Learn to retrieve, place, and use an AED when every second counts.",
    href: "/aed-training",
    image: require("../assets/images/aed.jpg"),
  },
  {
    title: "First Aid",
    price: "$69",
    duration: "2–3 hours",
    description: "Practical first aid for bleeding, burns, and sudden illness until help arrives.",
    href: "/first-aid-training",
    image: require("../assets/images/first-aid.jpg"),
  },
] as const
