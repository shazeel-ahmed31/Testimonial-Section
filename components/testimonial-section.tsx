"use client"

import { useState, useEffect, useId } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import Image from "next/image"
import {wrapIndex,canAutoplay} from "@/lib/carousel"

export type Testimonial = {id:number; name:string; role:string; company:string; image:string; quote:string; rating:number};
export const demoTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    image: "/placeholder.svg",
    quote:
      "This platform has completely transformed how we handle our customer relationships. The layout makes common tasks easy to find in this fictional example.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCorp",
    image: "/placeholder.svg",
    quote:
      "Outstanding support and incredible functionality. This fictional example illustrates how a review card can describe a product. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthLab",
    image: "/placeholder.svg",
    quote:
      "The analytics and reporting features are game-changing. We can now make data-driven decisions that help explain the sample reporting interface.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "CTO",
    company: "ScaleUp Solutions",
    image: "/placeholder.svg",
    quote:
      "Seamless integration and robust security features. Our development team was up and running in just a few hours. The API documentation is exceptional.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Operations Manager",
    company: "Efficiency Pro",
    image: "/placeholder.svg",
    quote:
      "The automation capabilities have saved us countless hours every week. What used to take our team days now happens automatically. It's like having a superpower!",
    rating: 5,
  },
]

export default function Testimonials({testimonials=demoTestimonials, intervalMs=5000}:{testimonials?:Testimonial[];intervalMs?:number}) {
  const [currentIndex,setCurrentIndex] = useState(0);
  const [isAutoPlaying,setIsAutoPlaying] = useState(false);
  const [reduced,setReduced] = useState(true);
  const [focused,setFocused] = useState(false);
  const [hovered,setHovered] = useState(false);
  const [visible,setVisible] = useState(true);
  const slideId = useId();
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setReduced(media.matches);
    const visibility=()=>setVisible(!document.hidden);
    update();visibility();media.addEventListener('change',update);document.addEventListener('visibilitychange',visibility);
    return ()=>{media.removeEventListener('change',update);document.removeEventListener('visibilitychange',visibility);};
  },[]);
  const playing=canAutoplay(isAutoPlaying,reduced,focused,hovered,visible,testimonials.length);
  useEffect(()=>{
    if(!playing)return;
    const timer=setInterval(()=>setCurrentIndex(i=>wrapIndex(i+1,testimonials.length)),Math.max(1000,intervalMs));
    return ()=>clearInterval(timer);
  },[playing,intervalMs,testimonials.length]);
  const activeIndex=wrapIndex(currentIndex,testimonials.length);
  const goToSlide=(i:number)=>{setCurrentIndex(wrapIndex(i,testimonials.length));setIsAutoPlaying(false);};
  const goToPrevious=()=>goToSlide(activeIndex-1);
  const goToNext=()=>goToSlide(activeIndex+1);
  if(!testimonials.length)return <section aria-label="Testimonials"><h2>Testimonial demo</h2><p>No testimonials configured.</p></section>;
  const currentTestimonial=testimonials[activeIndex];

  return (
    <section aria-label="Testimonial carousel" aria-roledescription="carousel" onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setFocused(false);}} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Testimonial Carousel Demo</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Fictional sample profiles and reviews, provided to demonstrate the component.
            </p>
          </div>
        </div>

        <div id={slideId} role="group" aria-roledescription="slide" aria-label={`${activeIndex+1} of ${testimonials.length}`} aria-live={playing ? "off" : "polite"} className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="px-14 py-8 md:p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Quote Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Quote className="w-8 h-8 text-primary" />
                </div>

                {/* Stars */}
                <div role="img" aria-label={`${Math.max(0,Math.min(5,Math.floor(currentTestimonial.rating)||0))} out of 5 stars`} className="flex items-center space-x-1">
                  {[...Array(Math.max(0,Math.min(5,Math.floor(currentTestimonial.rating)||0)))].map((_, i) => (
                    <Star aria-hidden="true" key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-gray-900 max-w-3xl">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex flex-col items-center space-y-4 pt-6">
                  <div className="relative">
                    <Image
                      src={currentTestimonial.image || "/placeholder.svg"}
                      alt={currentTestimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg text-gray-900">{currentTestimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 bg-white/90 backdrop-blur-sm border-2 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 bg-white/90 backdrop-blur-sm border-2 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              onClick={goToNext}
            >
              <ChevronRight className="w-5 h-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
              aria-controls={slideId} aria-current={index === activeIndex ? "true" : undefined} aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-8 pb-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              aria-label={`Show testimonial from ${testimonial.name}`} aria-controls={slideId} aria-current={index === activeIndex ? "true" : undefined}
              className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
                index === activeIndex ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-gray-100"
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-500" : "bg-gray-400"}`} />
            <Button variant="outline" disabled={reduced || testimonials.length<2} aria-pressed={isAutoPlaying} onClick={()=>setIsAutoPlaying(p=>!p)}>{isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}</Button>
            <span>{reduced ? 'Reduced motion: autoplay disabled' : playing ? 'Auto-playing' : 'Paused'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
