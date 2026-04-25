export interface Service {
  id: string
  title: string
  descriptor: string
  img: string
  description: string[]
  features: string[]
}

export const services: Service[] = [
  {
    id: '01',
    title: 'Plumbing',
    descriptor: 'Leaks, drains, fixtures \u0026 pipes',
    img: '/images/service-plumbing.jpg',
    description: [
      'From dripping faucets to burst pipes, I handle all residential plumbing repairs across the GTA. Whether it is a clogged drain, a running toilet, or a leaking pipe under the sink, I diagnose and fix the problem quickly.',
      'I work with copper, PEX, and PVC systems, and I always ensure proper sealing and pressure testing before completing the job. Emergency plumbing calls are available 24/7.',
    ],
    features: [
      'Leak detection and repair',
      'Drain cleaning and unclogging',
      'Faucet and fixture installation',
      'Toilet repair and replacement',
      'Pipe sealing and joint repair',
      'Emergency 24/7 service',
    ],
  },
  {
    id: '02',
    title: 'Drywall',
    descriptor: 'Installation, repair \u0026 finishing',
    img: '/images/service-drywall.jpg',
    description: [
      'Professional drywall installation, repair, and finishing for any room in your home. From patching small holes to hanging full sheets in a new build or renovation, I deliver smooth, seamless results.',
      'I handle taping, mudding, sanding, and texturing to match your existing walls. Whether it is water damage repair or a basement finishing project, the surface will be ready for paint.',
    ],
    features: [
      'New drywall installation',
      'Hole and crack repair',
      'Water damage restoration',
      'Taping, mudding, and sanding',
      'Texture matching',
      'Basement finishing',
    ],
  },
  {
    id: '03',
    title: 'Masonry \u0026 Concrete',
    descriptor: 'Expert concrete \u0026 brickwork',
    img: '/images/service-masonry.jpg',
    description: [
      'As a fully qualified concrete and masonry specialist, I bring structural integrity and craftsmanship to every project. From poured concrete walkways to brick and stone repairs, the work is built to last.',
      'I handle concrete slabs, steps, walkways, retaining walls, and brickwork repairs. Proper preparation, reinforcement, and curing ensure durable results through Toronto\'s freeze-thaw cycles.',
    ],
    features: [
      'Concrete walkways and patios',
      'Foundation repairs',
      'Brick and stone pointing',
      'Retaining walls',
      'Concrete steps and slabs',
      'Crack sealing and restoration',
    ],
  },
  {
    id: '04',
    title: 'Door Installation',
    descriptor: 'Interior \u0026 exterior doors',
    img: '/images/service-doors.jpg',
    description: [
      'Proper door installation is about precision — a perfectly hung door opens smoothly, seals tightly, and looks great. I install and replace interior and exterior doors throughout the GTA.',
      'From standard hinged doors to sliding patio doors, I ensure proper frame alignment, hardware installation, and weather sealing. Old door removal and disposal included.',
    ],
    features: [
      'Interior door installation',
      'Exterior door replacement',
      'Patio and sliding doors',
      'Frame repair and alignment',
      'Hardware and lock installation',
      'Weather stripping and sealing',
    ],
  },
  {
    id: '05',
    title: 'Grout \u0026 Caulking',
    descriptor: 'Expert grout restoration',
    img: '/images/service-grout.jpg',
    description: [
      'Discoloured, cracked, or missing grout makes even beautiful tile look aged. I specialize in grout cleaning, repair, and re-grouting for kitchens, bathrooms, and floors throughout the home.',
      'I also handle caulking around tubs, sinks, windows, and doors — removing old mildewed caulk and applying fresh, clean beads that seal out moisture and look sharp.',
    ],
    features: [
      'Grout cleaning and sealing',
      'Re-grouting tile surfaces',
      'Caulk removal and replacement',
      'Bathroom and kitchen sealing',
      'Window and door caulking',
      'Silicone and latex caulk application',
    ],
  },
  {
    id: '06',
    title: 'General Repairs',
    descriptor: 'All-around home fixes',
    img: '/images/service-general.jpg',
    description: [
      'Sometimes you just need a reliable handyman to take care of that growing to-do list. I handle all types of general home repairs — from hanging shelves and assembling furniture to fixing squeaky stairs and patching walls.',
      'No job is too small. I show up on time, work efficiently, and clean up before I leave. One call handles it all across the Greater Toronto Area.',
    ],
    features: [
      'Furniture assembly',
      'Shelf and TV mounting',
      'Lock and hardware repair',
      'Squeaky floor and stair fixes',
      'Minor carpentry work',
      'Odd jobs and to-do lists',
    ],
  },
]
