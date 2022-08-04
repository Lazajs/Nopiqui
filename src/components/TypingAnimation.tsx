import React from "react"
import Typewriting from "components/Typewriting"
import 'styles/TypingAnimation.scss'

export default function TypingAnimation () {
  return (
    <div className="background">
      <span className="fade"></span>
      <Typewriting text='Mi sit amet mauris commodo quis imperdiet massa lorem' clase='first' delay={5500}/>
      <Typewriting text='Ptatem accusantium doloremque laudantium, totam remat' clase='second' delay={11000}/>
      <Typewriting text='Sed ut perspiciatis unde omnis iste natus error sitvu' clase='third' delay={18000} />
      <Typewriting text='Et quasi architecto beatae vitae dicta sunt explicabo' clase='fourth' delay={24000} />
    </div>

  ) 
}