import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleProducts = [
  {
    title: "Premium Whey Protein Powder",
    slug: "premium-whey-protein-powder",
    description: "High-quality whey protein isolate with 25g protein per serving. Perfect for post-workout recovery and muscle building. Available in chocolate, vanilla, and strawberry flavors.",
    price: 49.99,
    category: "Supplements",
    rating: 4.8,
    popularity: 95,
    inStock: true
  },
  {
    title: "Adjustable Dumbbells Set",
    slug: "adjustable-dumbbells-set",
    description: "Space-saving adjustable dumbbells that replace 15 sets of weights. Quick-change weight selection from 5lbs to 52.5lbs per dumbbell.",
    price: 299.99,
    category: "Equipment",
    rating: 4.7,
    popularity: 88,
    inStock: true
  },
  {
    title: "Pre-Workout Energy Formula",
    slug: "pre-workout-energy-formula",
    description: "Explosive energy blend with caffeine, beta-alanine, and creatine. Enhances focus, strength, and endurance during intense workouts.",
    price: 34.99,
    category: "Supplements",
    rating: 4.6,
    popularity: 92,
    inStock: true
  },
  {
    title: "Resistance Bands Set",
    slug: "resistance-bands-set",
    description: "Complete resistance bands set with 5 different resistance levels. Includes door anchor, handles, and ankle straps for full-body workouts.",
    price: 29.99,
    category: "Equipment",
    rating: 4.5,
    popularity: 85,
    inStock: true
  },
  {
    title: "BCAA Recovery Drink",
    slug: "bcaa-recovery-drink",
    description: "Branch Chain Amino Acids formula for faster muscle recovery. Sugar-free with natural flavoring and electrolytes.",
    price: 27.99,
    category: "Supplements",
    rating: 4.4,
    popularity: 78,
    inStock: true
  },
  {
    title: "Yoga Mat Premium",
    slug: "yoga-mat-premium",
    description: "Non-slip premium yoga mat with extra thickness for comfort. Made from eco-friendly TPE material. Perfect for yoga, pilates, and stretching.",
    price: 39.99,
    category: "Equipment",
    rating: 4.6,
    popularity: 82,
    inStock: true
  },
  {
    title: "Performance T-Shirt",
    slug: "performance-t-shirt",
    description: "Moisture-wicking athletic t-shirt with comfortable fit. Made from breathable fabric that keeps you dry during intense workouts.",
    price: 24.99,
    category: "Apparel",
    rating: 4.3,
    popularity: 75,
    inStock: true
  },
  {
    title: "Creatine Monohydrate",
    slug: "creatine-monohydrate",
    description: "Pure creatine monohydrate powder for increased strength and power. Unflavored and mixes easily with any beverage.",
    price: 19.99,
    category: "Supplements",
    rating: 4.7,
    popularity: 90,
    inStock: true
  },
  {
    title: "Kettlebell 20lb",
    slug: "kettlebell-20lb",
    description: "Cast iron kettlebell with comfortable grip handle. Perfect for strength training, cardio, and functional fitness workouts.",
    price: 45.99,
    category: "Equipment",
    rating: 4.8,
    popularity: 87,
    inStock: true
  },
  {
    title: "Athletic Shorts",
    slug: "athletic-shorts",
    description: "Lightweight athletic shorts with moisture-wicking fabric. Features side pockets and adjustable waistband for comfort during workouts.",
    price: 19.99,
    category: "Apparel",
    rating: 4.2,
    popularity: 73,
    inStock: true
  }
]

async function main() {
  console.log('🌱 Seeding database with sample products...')
  
  for (const product of sampleProducts) {
    try {
      const created = await prisma.product.create({
        data: product
      })
      console.log(`✅ Created product: ${created.title}`)
    } catch (error) {
      console.log(`⚠️ Product ${product.title} might already exist, skipping...`)
    }
  }
  
  console.log('🎉 Database seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })