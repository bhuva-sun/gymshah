import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample products
  const products = [
    {
      title: 'Premium Protein Powder',
      slug: 'premium-protein-powder',
      category: 'Supplements',
      description: 'High-quality whey protein isolate with 25g protein per serving. Perfect for muscle recovery and growth.',
      price: 49.99,
      stock: 100,
      rating: 4.8,
      image: '/images/protein-powder.jpg',
      popularity: 95
    },
    {
      title: 'Resistance Bands Set',
      slug: 'resistance-bands-set',
      category: 'Equipment',
      description: 'Complete set of 5 resistance bands with different resistance levels. Perfect for home workouts and travel.',
      price: 29.99,
      stock: 75,
      rating: 4.6,
      image: '/images/resistance-bands.jpg',
      popularity: 88
    },
    {
      title: 'Fitness Tracker Watch',
      slug: 'fitness-tracker-watch',
      category: 'Electronics',
      description: 'Smart fitness watch with heart rate monitoring, step counting, and workout tracking capabilities.',
      price: 89.99,
      stock: 50,
      rating: 4.7,
      image: '/images/fitness-watch.jpg',
      popularity: 92
    },
    {
      title: 'Yoga Mat Premium',
      slug: 'yoga-mat-premium',
      category: 'Equipment',
      description: 'Non-slip yoga mat made from eco-friendly materials. Perfect thickness for comfort and stability.',
      price: 39.99,
      stock: 60,
      rating: 4.5,
      image: '/images/yoga-mat.jpg',
      popularity: 85
    },
    {
      title: 'BCAA Amino Acids',
      slug: 'bcaa-amino-acids',
      category: 'Supplements',
      description: 'Branched-chain amino acids supplement to support muscle recovery and reduce muscle soreness.',
      price: 24.99,
      stock: 80,
      rating: 4.4,
      image: '/images/bcaa.jpg',
      popularity: 78
    },
    {
      title: 'Dumbbell Set (10-50 lbs)',
      slug: 'dumbbell-set',
      category: 'Equipment',
      description: 'Professional grade dumbbell set with rack. Includes weights from 10 to 50 pounds.',
      price: 299.99,
      stock: 25,
      rating: 4.9,
      image: '/images/dumbbells.jpg',
      popularity: 96
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
    console.log(`✅ Added/Updated: ${product.title}`);
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
