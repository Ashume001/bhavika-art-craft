import CategoriesSection from './CategorySection'
import PremiumCTA from './CtaSection'
import FeaturedProducts from './FeatureProduct'
import Hero from './Hero'
import TestimonialsSection from './Testimonial'

const Home = () => {
  return (
    <>
    <div className="space-y-1">
     <Hero />
     <FeaturedProducts />
     <CategoriesSection />
     <TestimonialsSection />
     <PremiumCTA />
     </div>
    </>
  )
}

export default Home