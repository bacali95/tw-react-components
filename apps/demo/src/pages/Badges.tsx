import { ArrowLeftIcon, ArrowRightIcon, XIcon } from 'lucide-react';
import { FC, ReactNode } from 'react';

import { Badge, BadgeVariant, Card, Flex } from 'tw-react-components';

const variants: BadgeVariant[] = ['default', 'red', 'orange', 'yellow', 'green', 'blue', 'purple'];

export const Badges: FC = () => {
  const RenderVariants = ({ children }: { children: (variant: BadgeVariant) => ReactNode }) =>
    variants.map((variant, index) => <span key={index}>{children(variant)}</span>);

  return (
    <>
      <Card className="overflow-auto" fullWidth>
        <Flex className="gap-2" direction="column">
          <p className="text-lg">Simple badges</p>
          <Flex className="!gap-2">
            <RenderVariants>
              {(variant) => (
                <Badge
                  className="capitalize"
                  variant={variant}
                  onClick={() => alert(`Badge ${variant} clicked!`)}
                >
                  {variant}
                </Badge>
              )}
            </RenderVariants>
          </Flex>
          <p className="text-lg">Outline badges</p>
          <Flex className="!gap-2">
            <RenderVariants>
              {(variant) => (
                <Badge
                  className="capitalize"
                  variant={variant}
                  outline
                  onClick={() => alert(`Badge ${variant} clicked!`)}
                >
                  {variant}
                </Badge>
              )}
            </RenderVariants>
          </Flex>
          <p className="text-lg">Badges Sizes</p>
          <Flex wrap>
            <RenderVariants>
              {(variant) => (
                <Flex align="end">
                  <Badge variant={variant} size="small">
                    Small
                  </Badge>
                  <Badge variant={variant} size="medium">
                    Medium
                  </Badge>
                  <Badge variant={variant} size="large">
                    Big
                  </Badge>
                </Flex>
              )}
            </RenderVariants>
          </Flex>
          <p className="text-lg">Badges with prefix icons</p>
          <Flex className="!gap-2">
            <RenderVariants>
              {(variant) => (
                <Badge className="capitalize" prefixIcon={ArrowLeftIcon} variant={variant}>
                  {variant}
                </Badge>
              )}
            </RenderVariants>
          </Flex>
          <p className="text-lg">Badges with suffix icons</p>
          <Flex className="!gap-2">
            <RenderVariants>
              {(variant) => (
                <Badge className="capitalize" suffixIcon={ArrowRightIcon} variant={variant}>
                  {variant}
                </Badge>
              )}
            </RenderVariants>
          </Flex>
          <p className="text-lg">Icon badges</p>
          <Flex className="!gap-2">
            <RenderVariants>
              {(variant) => <Badge prefixIcon={XIcon} variant={variant} />}
            </RenderVariants>
          </Flex>
        </Flex>
      </Card>
      <Flex>
        <Badge variant="inverse" onClick={() => alert('Badge inverse clicked!')}>
          Inverse
        </Badge>
        <Badge variant="inverse" outline onClick={() => alert('Badge inverse clicked!')}>
          Inverse
        </Badge>
      </Flex>
    </>
  );
};
