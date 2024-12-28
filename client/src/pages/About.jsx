import React from 'react';
import styled from 'styled-components';
import { Banner } from '../components';
import AboutUsTimeline from '../components/AboutUsTimeline';

const About = () => {
  return (
    <Wrapper className="page">
      <Banner title={'about'} />
      <h3>About us</h3>
      <p>
        Our company's founders didn't mess around,
        and their spirit of American, get-it done
        ingenuity has always been Savage Arms'
        driving force. All of our
        category-changing innovations have come
        from just such a place of principle. We're
        constantly looking ahead, finding new ways
        to leverage technology to push performance
        ever higher.
      </p>
      <p>
        But we're not just a bunch of lab geeks,
        either. We're shooters. Hunters.
        Competitors. We know what makes or breaks
        a firearm's performance out there in the
        real world. And throughout the years,
        we've spent time listening to the best
        competitive shooters, sharing campfires
        with hunters and guides, and comparing
        notes with gun writers. That
        collaboration, that hands-on experience,
        has fueled the development of features and
        processes unlike any ever seen in gun
        manufacturing.
      </p>
      <p>
        The results could not be clearer: Modern
        firearms stripped of pretense and
        gimmickry, leaving only muscular,
        no-nonsense engines of performance. Just
        like the people who use them. They're
        purposebuilt firearms that come out of the
        box bristling with special features you
        won't find from other manufacturers.
      </p>
      <p>
        That's why holding a Savage in your hands
        is knowing what winning feels like.
        Whether you use them for recreational or
        competitive shooting, self-defense or
        hunting, every inch of our products is
        designed to give you an edge. What began
        with Arthur Savage back in 1894, continues
        stronger than ever today.
      </p>
      <AboutUsTimeline />
    </Wrapper>
  );
};
const Wrapper = styled.main`
  max-width: var(--max-width);
  margin: 0 auto;
  h3 {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: var(--letter-spacing);
    margin-bottom: 2rem;
  }
  p {
    max-width: var(--max-width);
    margin-bottom: 2rem;
    font-size: 1.2rem;
    line-height: 1.5;
    color: var(--grey-800);
  }
`;
export default About;
