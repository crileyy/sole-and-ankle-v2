import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const Flag = ({ variant }) => {
    if (variant === 'on-sale') {
      return <FlagText style={{ '--color': 'hsla(340, 65%, 47%, 1)' }}>Sale</FlagText>;
    } else if (variant === 'new-release') {
      return <FlagText style={{ '--color': 'hsla(240, 60%, 63%, 1)' }}>Just released!</FlagText>;
    } else {
      return <></>;
    }
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <Flag variant={variant} />
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const FlagText = styled.p`
  position: absolute;
  z-index: 1;
  top: 12px;
  right: -4px;
  padding: 8px 12px;
  background-color: var(--color);
  border-radius: 2px;
  color: hsla(0, 0%, 100%, 1);
  font-weight: 700;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 324px;
`;

const Wrapper = styled.article`
  width: 100%;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
