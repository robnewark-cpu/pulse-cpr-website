export const siteConfig = {
  name: "Pulse CPR",
  legalName: "Pulse CPR Oklahoma, LLC",
  tagline: "Lifesaving skills. Oklahoma-ready teams.",
  description:
    "Pulse CPR delivers professional CPR, BLS, AED, and First Aid certification from Edmond, Oklahoma, and on-site across the state. Book a public class or request workplace training for schools, clinics, and companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pulsecprok.com",
  phone: "(405) 763-6811",
  phoneHref: "tel:+14057636811",
  email: "contact@pulsecprok.com",
  bookingEmail: "contact@pulsecprok.com",
  address: {
    street: "1019 Waterwood Pkwy, Ste C",
    city: "Edmond",
    region: "OK",
    postalCode: "73034",
    country: "US",
  },
  geo: {
    latitude: 35.65247,
    longitude: -97.46978,
  },
  hours: [
    { day: "Monday–Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 2:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  openingHoursSpecification: [
    "Mo-Fr 08:00-18:00",
    "Sa 09:00-14:00",
  ],
  serviceArea: [
    "Edmond",
    "Oklahoma City",
    "Norman",
    "Moore",
    "Yukon",
    "Midwest City",
    "Tulsa",
    "Broken Arrow",
    "Stillwater",
    "Lawton",
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61572683277410",
    facebookReviews:
      "https://www.facebook.com/profile.php?id=61572683277410&sk=reviews",
  },
} as const

export const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/cpr-certification",
    label: "Courses",
    children: [
      { href: "/cpr-certification", label: "CPR Certification" },
      { href: "/first-aid-training", label: "First Aid Training" },
      { href: "/aed-training", label: "AED Training" },
      { href: "/healthcare-provider-courses", label: "Healthcare Provider Courses" },
      { href: "/corporate-training", label: "Corporate Training" },
    ],
  },
  { href: "/class-calendar", label: "Class Calendar" },
  { href: "/resources", label: "Resources" },
  { href: "/oklahoma-cpr-training", label: "Oklahoma" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

export const stats = [
  { value: "Edmond + on-site", label: "Classroom and statewide training" },
  { value: "2-year", label: "Typical card validity" },
  { value: "10/10", label: "Facebook reviews recommend Pulse.CPR" },
  { value: "Same-week", label: "Corporate scheduling" },
] as const

export const courses = [
  {
    slug: "cpr-certification",
    title: "CPR Certification",
    shortTitle: "Heartsaver CPR",
    audience: "Workplace, schools, and community responders",
    duration: "3–4 hours",
    price: "$75",
    renewal: "Valid 2 years",
    summary:
      "Adult, child, and infant CPR with choking response. Built for teachers, coaches, childcare staff, and any team that needs a nationally recognized card.",
    href: "/cpr-certification",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    highlights: [
      "Adult, child, and infant CPR",
      "Choking relief for all ages",
      "Hands-on manikin practice",
      "Same-day eCard processing",
    ],
  },
  {
    slug: "first-aid-training",
    title: "First Aid Training",
    shortTitle: "First Aid",
    audience: "Employers, coaches, and caregivers",
    duration: "2–3 hours",
    price: "$69",
    renewal: "Valid 2 years",
    summary:
      "Practical first aid for bleeding, burns, medical emergencies, and injury assessment so your team can act before EMS arrives.",
    href: "/first-aid-training",
    image:
      "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&w=1400&q=80",
    highlights: [
      "Bleeding control and shock",
      "Burns, breaks, and sprains",
      "Sudden illness response",
      "OSHA-friendly workplace modules",
    ],
  },
  {
    slug: "aed-training",
    title: "AED Training",
    shortTitle: "AED",
    audience: "Offices, gyms, churches, and public venues",
    duration: "2 hours",
    price: "$59",
    renewal: "Valid 2 years",
    summary:
      "Learn to recognize sudden cardiac arrest, apply pads correctly, and deliver a shock with confidence using the AED on your wall.",
    href: "/aed-training",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
    highlights: [
      "Pad placement and prompts",
      "Adult and pediatric pads",
      "Maintenance and readiness checks",
      "Oklahoma Good Samaritan context",
    ],
  },
  {
    slug: "healthcare-provider-courses",
    title: "Healthcare Provider Courses",
    shortTitle: "BLS / ACLS / PALS",
    audience: "Nurses, EMTs, dentists, and clinical teams",
    duration: "4–16 hours",
    price: "From $95",
    renewal: "Valid 2 years",
    summary:
      "BLS Provider, ACLS, and PALS for licensed clinicians who need current cards for credentialing, privileging, or onboarding.",
    href: "/healthcare-provider-courses",
    image:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1400&q=80",
    highlights: [
      "BLS Provider with high-performance CPR",
      "ACLS and PALS renewal options",
      "Skills testing with current algorithms",
      "Hospital and clinic group sessions",
    ],
  },
  {
    slug: "corporate-training",
    title: "Corporate Training",
    shortTitle: "On-site teams",
    audience: "Businesses, schools, and agencies",
    duration: "Half-day or custom",
    price: "Custom quote",
    renewal: "Scheduled to your roster",
    summary:
      "We bring the instructor, manikins, and AEDs to your Oklahoma workplace so entire shifts certify without losing a full day off-site.",
    href: "/corporate-training",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    highlights: [
      "On-site across Oklahoma",
      "Shift-friendly scheduling",
      "Group pricing from 6 students",
      "Safety officer reporting",
    ],
  },
] as const

export const defaultInstructor = "Christine Oldenburg"

export const instructors = [
  {
    name: "Christine Oldenburg, RN",
    role: "Founder and Lead Instructor",
    credentials: "RN · ACLS · AHA CPR · AHA Instructor",
    certifications: [
      "Registered Nurse (RN)",
      "Advanced Cardiac Life Support (ACLS)",
      "American Heart Association CPR Certification",
      "American Heart Association Instructor Certification",
    ],
    shortBio:
      "Christine Oldenburg, RN, is the founder and lead instructor of Pulse CPR. With more than 24 years of nursing experience and extensive clinical backgrounds in emergency, critical care, telemetry, cardiac, and hospital nursing, she brings real-world healthcare expertise into every classroom. As an American Heart Association Instructor and former healthcare educator, Christine is passionate about teaching practical lifesaving skills that help individuals and organizations respond confidently during emergencies.",
    bio: [
      "Christine Oldenburg is a Registered Nurse with more than 24 years of healthcare experience serving patients throughout Oklahoma. Throughout her nursing career, she has worked in medical-surgical units, oncology, telemetry, intensive care, critical care, emergency care, cardiac step-down units, and hospital float nursing, providing care to patients across a wide range of healthcare settings.",
      "Christine earned her Associate Degree in Nursing from Rose State College and has maintained active nursing licensure in the State of Oklahoma. Her professional experience includes work with Mercy Hospital, Norman Regional Hospital, OU Medical Center, and Midwest Regional Medical Center. Throughout her career, she has cared for patients experiencing cardiac emergencies, critical illness, and complex medical conditions, developing the calm decision-making skills required during life-threatening situations.",
      "In addition to her bedside nursing experience, Christine served as an Adjunct Instructor RN for Moore Norman Technology Center, where she helped develop, teach, and implement state-approved healthcare training programs. Her experience as both a clinician and educator allows her to present lifesaving skills in a clear, practical, and engaging way for students of all experience levels.",
      "Through Pulse CPR, Christine is committed to empowering individuals, families, healthcare professionals, businesses, schools, churches, and community organizations with the skills and confidence needed to respond during emergencies when every second matters.",
    ],
    image: "",
  },
] as const

export const trustReasons = [
  "Led by a Registered Nurse with 24+ years of healthcare experience",
  "American Heart Association Instructor Certified",
  "Hands-On Training From Real Healthcare Experience",
  "Flexible Classes for Individuals and Organizations",
  "Corporate and On-Site Training Available",
  "Practical, Easy-to-Understand Instruction",
] as const

export const aboutMission =
  "At Pulse CPR, our mission is to equip individuals and organizations with the knowledge, skills, and confidence needed to respond effectively during medical emergencies. We believe that quality CPR and first aid training saves lives, strengthens communities, and empowers people to act when moments matter most."

export const testimonials = [
  {
    name: "Cecelia Varela",
    date: "September 27, 2025",
    quote:
      "Just got done with my class. She did an amazing job. Thank you so much. Definitely recommend booking a class from her.",
  },
  {
    name: "Kayla Price",
    date: "September 27, 2025",
    quote:
      "I had 4 girls needing CPR asap and she was so accommodating and quick! Contacted her on a Monday and had the class set up for later that week! Shes super sweet! Highly recommend!!",
  },
  {
    name: "Cayla Kieser",
    date: "September 4, 2025",
    quote: "Christine is amazing! I love how hands on her classes are!",
  },
  {
    name: "Emily Ray",
    date: "September 4, 2025",
    quote: "Christine was an amazing instructor!",
  },
  {
    name: "Elite Kids Learning Center",
    date: "July 9, 2025",
    quote: "Great company! provided CPR training for my employees at my daycare!",
  },
  {
    name: "Acacia Bradford",
    date: "June 12, 2025",
    quote:
      "Such a great experience! The instructor was very professional and kind. I love the fact that she came to me, instead of me having to go sit in a classroom somewhere.",
  },
  {
    name: "Kimberlee Duncan",
    date: "April 10, 2025",
    quote:
      "What a great experience with Pulse cpr. The instructor was awesome . She made me feel comfortable and was very knowledgeable. I would highly recommend!!!!!!",
  },
  {
    name: "Brittany Wilbanks",
    date: "March 29, 2025",
    quote:
      "I can't say enough good things about Pulse CPR and the CPR certification course I took with them! From start to finish, the entire experience was exceptional and exceeded my expectations. The team is not only highly skilled but also incredibly passionate about making sure each student leaves with the confidence and knowledge to act in an emergency situation. What stood out to me the most was the hands-on, real-world approach they took to teaching. Instead of just focusing on memorizing steps, they really emphasized the \"why\" behind every technique. The instructor made the material relatable, and I never once felt overwhelmed. In fact, I felt empowered! The facility itself was modern, spotless, and filled with all the necessary equipment for a realistic training experience. The CPR dummies felt so lifelike, and the AED simulations were super helpful. They even had a practice scenario where we had to react to a surprise emergency situation – it was a great way to see how we would respond under pressure. I also loved how they went above and beyond with post-course support. After completing my certification, I received a digital toolkit with refresher materials and videos to help keep my skills sharp. It's clear that Pulse CPR truly cares about its students and their preparedness long after the class ends. If you're looking for CPR training that goes beyond the basics and prepares you for any emergency, look no further than Pulse CPR. They've set the bar high for what CPR training should be, and I'm so glad I chose them!",
  },
  {
    name: "Lb Loud",
    date: "March 1, 2025",
    quote:
      "I can't recommend Pulse CPR enough! The CPR class was incredibly informative, hands-on, and well-structured. They are fantastic instructors—knowledgeable, patient, and engaging. They make learning CPR simple and easy to remember, which is exactly what you need in an emergency. Whether you're a first-timer or need a refresher, this is the perfect place to get certified. Definitely a must for anyone wanting to be prepared to save a life!",
  },
  {
    name: "Shelby Martinez",
    date: "February 2, 2025",
    quote:
      "I had the pleasure of being the first customer at Pulse CPR, and I couldn't be more impressed. I was a bit nervous going in, but both sisters did an excellent job of walking me through the process. Seeing them demonstrate first really helped calm my nerves, and by the time I was practicing, I felt so much more confident. The training verification process was simple and easy, and their hands-on, supportive approach made everything clear. I left knowing I can save a life successfully. Highly recommend Pulse CPR for anyone looking for a top-notch CPR course with caring and professional instructors!",
  },
] as const

export const faqs = [
  {
    question: "How long is CPR certification valid?",
    answer:
      "Most Heartsaver CPR, First Aid, AED, and BLS Provider cards are valid for two years. We recommend scheduling renewal 30–45 days before expiration so your team never has a gap.",
  },
  {
    question: "Do I receive a card the same day?",
    answer:
      "Yes. After you complete skills testing, we process nationally recognized eCards, typically the same business day. Printable receipts are available immediately for employers who need proof of attendance.",
  },
  {
    question: "Can you train our staff on-site?",
    answer:
      "We train on-site throughout Oklahoma, including Oklahoma City, Edmond, Norman, Tulsa, and surrounding communities. Six or more students usually makes an on-site session the better value.",
  },
  {
    question: "What should I bring to class?",
    answer:
      "Wear clothes you can move in, bring a government-issued ID, and complete any assigned prework. We supply manikins, AED trainers, and course materials. Closed-toe shoes are required for skills practice.",
  },
  {
    question: "Is this training aligned with current guidelines?",
    answer:
      "Yes. Pulse CPR instruction follows current American Heart Association and Emergency Cardiovascular Care science. Healthcare provider courses use the latest BLS, ACLS, and PALS algorithms.",
  },
  {
    question: "Do you offer evening or weekend classes?",
    answer:
      "Public classes run weeknights and Saturdays in Edmond. Corporate sessions can be scheduled before open, after close, or across multiple shifts.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Reschedule at no charge with 48 hours’ notice. Same-day cancellations may forfeit the seat fee because manikins and instructor time are already allocated. We always try to move you to the next open class.",
  },
  {
    question: "Can I combine CPR, AED, and First Aid?",
    answer:
      "Yes. Heartsaver CPR/AED/First Aid is our most requested workplace package. Tell us your industry and we will recommend the shortest course that still meets OSHA, childcare, or school requirements.",
  },
  {
    question: "Who is Pulse CPR?",
    answer:
      "Pulse CPR (Facebook: Pulse.CPR) is an Oklahoma training company founded by Christine Oldenburg, RN, an American Heart Association Instructor. Public classes meet at 1019 Waterwood Pkwy, Ste C, Edmond, OK 73034. Christine also trains on-site statewide.",
  },
  {
    question: "Which Oklahoma cities do you serve?",
    answer:
      "Pulse CPR serves Oklahoma City, Edmond, Norman, Moore, Yukon, Midwest City, Tulsa, Broken Arrow, Stillwater, Lawton, and other Oklahoma communities by request.",
  },
  {
    question: "Where can I read Pulse CPR reviews?",
    answer:
      "Public student reviews are on the Pulse.CPR Facebook page. As of August 2026, all 10 public Facebook reviews recommend Pulse.CPR. We do not currently display Google reviews.",
  },
  {
    question: "How do I book a CPR class in Oklahoma?",
    answer:
      "Use the booking form at pulsecprok.com/book, call (405) 763-6811, or email contact@pulsecprok.com. Request an on-site quote for groups of six or more. A coordinator confirms seats within one business day.",
  },
] as const

export const classes = [
  {
    id: "bls-0906",
    title: "BLS Provider",
    category: "Healthcare",
    date: "2026-09-06",
    time: "8:00 AM – 12:30 PM",
    location: "Edmond classroom",
    seats: 6,
    price: "$95",
  },
  {
    id: "cpr-0908",
    title: "Heartsaver CPR/AED",
    category: "CPR",
    date: "2026-09-08",
    time: "5:30 PM – 9:00 PM",
    location: "Edmond classroom",
    seats: 8,
    price: "$75",
  },
  {
    id: "fa-0912",
    title: "First Aid Certification",
    category: "First Aid",
    date: "2026-09-12",
    time: "9:00 AM – 12:00 PM",
    location: "Edmond classroom",
    seats: 10,
    price: "$69",
  },
  {
    id: "aed-0916",
    title: "AED Skills Workshop",
    category: "AED",
    date: "2026-09-16",
    time: "6:00 PM – 8:00 PM",
    location: "Edmond classroom",
    seats: 12,
    price: "$59",
  },
  {
    id: "bls-0920",
    title: "BLS Provider Renewal",
    category: "Healthcare",
    date: "2026-09-20",
    time: "8:00 AM – 11:30 AM",
    location: "Edmond classroom",
    seats: 4,
    price: "$85",
  },
  {
    id: "cpr-0926",
    title: "Heartsaver CPR/AED/First Aid",
    category: "CPR",
    date: "2026-09-26",
    time: "9:00 AM – 3:00 PM",
    location: "Edmond classroom",
    seats: 7,
    price: "$119",
  },
  {
    id: "pals-1003",
    title: "PALS Provider",
    category: "Healthcare",
    date: "2026-10-03",
    time: "8:00 AM – 4:00 PM",
    location: "Edmond classroom",
    seats: 5,
    price: "$195",
  },
  {
    id: "cpr-1007",
    title: "Heartsaver CPR/AED",
    category: "CPR",
    date: "2026-10-07",
    time: "5:30 PM – 9:00 PM",
    location: "Edmond classroom",
    seats: 9,
    price: "$75",
  },
  {
    id: "acls-1017",
    title: "ACLS Provider",
    category: "Healthcare",
    date: "2026-10-17",
    time: "8:00 AM – 4:30 PM",
    location: "Edmond classroom",
    seats: 6,
    price: "$195",
  },
  {
    id: "fa-1024",
    title: "Pediatric First Aid & CPR",
    category: "First Aid",
    date: "2026-10-24",
    time: "9:00 AM – 2:00 PM",
    location: "Edmond classroom",
    seats: 8,
    price: "$99",
  },
  {
    id: "corp-1030",
    title: "On-site Corporate Session",
    category: "Corporate",
    date: "2026-10-30",
    time: "By request",
    location: "Your Oklahoma workplace",
    seats: 24,
    price: "Quote",
  },
  {
    id: "bls-1107",
    title: "BLS Provider",
    category: "Healthcare",
    date: "2026-11-07",
    time: "8:00 AM – 12:30 PM",
    location: "Edmond classroom",
    seats: 8,
    price: "$95",
  },
] as const

export const resources = [
  {
    slug: "oklahoma-workplace-first-aid-requirements",
    title: "Oklahoma workplace first aid: what employers actually need",
    excerpt:
      "A practical overview of OSHA first aid expectations, AED placement, and how Pulse CPR helps Oklahoma employers stay ready without overbuilding a program.",
    category: "Workplace",
    readTime: "6 min",
    date: "2026-08-12",
  },
  {
    slug: "how-often-to-renew-cpr-certification",
    title: "How often should you renew CPR certification?",
    excerpt:
      "Two-year cards expire faster than most teams think. Here is how to set a renewal cadence for schools, clinics, and shift-based workplaces.",
    category: "Certification",
    readTime: "4 min",
    date: "2026-07-28",
  },
  {
    slug: "oklahoma-aed-good-samaritan",
    title: "AEDs in Oklahoma: Good Samaritan protections and readiness",
    excerpt:
      "Having an AED on the wall is not the same as having a ready program. Learn pad checks, training, and the legal context for Oklahoma responders.",
    category: "AED",
    readTime: "7 min",
    date: "2026-07-09",
  },
  {
    slug: "bls-vs-heartsaver",
    title: "BLS vs Heartsaver: which CPR course is right for you?",
    excerpt:
      "Healthcare providers and workplace responders take different courses. This guide helps HR, credentialing, and individuals pick correctly the first time.",
    category: "Courses",
    readTime: "5 min",
    date: "2026-06-18",
  },
  {
    slug: "cpr-for-teachers-and-childcare",
    title: "CPR for Oklahoma teachers and childcare teams",
    excerpt:
      "Pediatric CPR, choking, and first aid for classrooms, after-school programs, and licensed childcare—without a weekend lost to travel.",
    category: "Education",
    readTime: "5 min",
    date: "2026-05-30",
  },
  {
    slug: "what-to-expect-in-a-bls-class",
    title: "What to expect in a Pulse CPR BLS class",
    excerpt:
      "From prework to high-performance CPR and eCards: a walkthrough so first-time healthcare students know exactly how the morning will go.",
    category: "Healthcare",
    readTime: "4 min",
    date: "2026-05-14",
  },
] as const

export const courseSelectOptions = [
  { value: "cpr", label: "CPR Certification" },
  { value: "first-aid", label: "First Aid Training" },
  { value: "aed", label: "AED Training" },
  { value: "bls", label: "BLS for Healthcare Providers" },
  { value: "acls", label: "ACLS" },
  { value: "pals", label: "PALS" },
  { value: "corporate", label: "Corporate / group training" },
  { value: "unsure", label: "Not sure — help me choose" },
] as const
