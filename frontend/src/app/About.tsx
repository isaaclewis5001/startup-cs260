import { NavLink } from "react-router-dom";

export function About() {
  return (<div className="main-content">
    <article>
      Lame images here for HTML and CSS deliverables, actual images used will be rendered with WebGL as part of the game.

      <h3>What is this?</h3>
      <p>
        This is a game about some very opinionated monkeys.
        The gameplay is relatively simple: throw bananas at the other team, while avoiding getting hit yourself.
        Each game has a very important (or perhaps not so important) question associated with it.
        The last monkey standing determines, once and for all, what the answer to that question is.
      </p>
      <img src="./andy-warhol.webp" height="200" className="image-right" />
      <h3>So what?</h3>
      <p>
        Suppose you and all those unfashionable rubes you call "friends"
        want to figure out what to do on a Friday night.
        They all want to go to the "movies" or meet some "cute prospective dating partners",
        while you, quite reasonably, would much rather go to the museum to admire <em>Fine Art</em>.
        Following a respectful and invigorating debate
        (though you might say it was completely one-sided if you weren't so humble),
        you and the bungle of delinquents you frequent with
        have not yet reached a unanimous consensus.
      </p>
      <p>
        So, despite your resounding intellectual victory, you agree hold it to a vote.
        After all, you must surely have convinced a majority of them by now of
        the merit of becoming men and women of the arts&mdash;their votes are
        really just a formality at this point.
        Against all odds, as the hands go up, you find your opinion to be the evident minority.
        In fact, as it comes time to cast votes for your long-awaited visit to the art museum,
        you find yourself alone in your pursuit&mdash;the sole defender of
        art and culture (a sight that would well be worthy of immortality in oil and canvas, if
        only there were a living painter worthy of its execution).
        However, as the reality of your situation sets in, you feel your face growing
        pale. The air around you seems to have become very cold, brushing against
        your skin mockingly.
        You realize you must appear quite silly with your single hand held high in the air,
        your skin tone that of the recently deceased.
        Only as the initial shock subsides and the blood returns to your head
        do you now realize your fatal mistake.
      </p>
      <p>
        <em>What use is voting on stuff if you can't always get what you want?</em>
      </p>
      <img src="./banana.webp" height="200" className="image-left" />
      <p>
        This is not an acceptable outcome.
        With your ego in shreds, you reach into the concealed holster on your left hip.
        You've been preparing for a moment just like this.
        From its ominous leather casing, you withdraw your (very much unlicensed) banana,
        which is, rather remarkably, perfectly ripened.
        Your voice tears through the evening stillness in a primal screech,
        as though the long-forgotten patron saint of some dark and wild corner of the world
        still lives on through you.
        Your body springs forward of its own desire, mind enthralled in the sirens' song
        of retribution&mdash;lost in the dance of battle.
      </p>
      <img src="sparta.webp" height="200" className="image-right" />
      <p>
        You hurl the banana directly into the forehead of the nearest dissenter, knocking them out instantly.
        Reaching into the other holster on your right hip, you pull out a second banana,
        because that will be faster than reloading your first one.
        As two of the others step towards you in an attempt to restrain you, you hear another attempting to
        call for help.
        With a couple well-placed slaps below the jaw from your yellow deathbringer,
        the two are rendered incapable of further resistance.
        The third coward, shouting words into their cell phone that your mind does not care to process,
        is floored with a well-aimed throw.
        You attempt to close the distance so you can finish the job.
        As you plant your foot, getting ready to strike with the third banana you had kept concealed
        in your right sock, you feel your leg slip out from under you and, for a brief moment, you see the world turn on its
        side before all goes dark.
      </p>
      <p>
        After a series of events that have somehow elude the mighty grasp of your formidable intellect,
        you become aware of a dull yet persistent soreness permeating every muscle in your body,
        as though you were just waking up after having tumbled down several flights of stairs in your sleep.
        Through a set of steel bars, you watch as a pudgy, tired-looking man in uniform
        passes by you on his way to the restroom,
        his footsteps echoing across your distastefully bare holding cell.
        As your sense more fully returns to you, you realize that you had been hopelessly outnumbered,
        despite your painstaken preparation and your undeniable skill in the art of war.
        Regardless of that, you maintain a fiery determination to achieve your purpose,
        because you have come to know that nothing can stand between you and your destiny&hellip;
      </p>
      <h3>Wow, I can totally relate with that! How do I get started?</h3>
      <p>
        You can begin your very own crusade of primitive ideological conquest
        by creating an account today.
      </p>
      <NavLink to="/register">Sign up</NavLink>
      <p>
        Have fun!
      </p>
    </article>
  </div>)
}
