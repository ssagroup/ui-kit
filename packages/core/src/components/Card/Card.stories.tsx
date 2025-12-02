import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Typography from '@components/Typography';
import Icon from '@components/Icon';
import Switch, { SwitchContextProvider } from '@components/Switch';
import Button from '@components/Button';
import ProgressCircle from '@components/ProgressCircle';
import CardHeader from '@components/CardHeader';
import CardContent from '@components/CardContent';
import Avatar from '@components/Avatar';
import Wrapper from '@components/Wrapper';

import Card from './index';
import { CardProps } from './types';
import ResponsiveImage from '@components/ResponsiveImage';
import { useTheme } from '@emotion/react';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    noShadow: {
      control: 'boolean',
    },
  },
} as Meta<typeof Card>;

const flexContainer = {
  display: 'flex',

  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',

  paddingLeft: 15,
};

export const Basic: StoryObj<typeof Card> = ({ noShadow }: CardProps) => {
  return (
    <Card noShadow={noShadow}>
      <CardHeader>
        <Typography variant="h2">Card</Typography>
      </CardHeader>

      <CardContent>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          eleifend, dui in commodo porttitor, neque metus lobortis sem, at
          suscipit arcu ligula non enim.
        </Typography>
      </CardContent>
    </Card>
  );
};
Basic.args = {};

export const IconHeader: StoryObj<typeof Card> = ({ noShadow }: CardProps) => {
  const theme = useTheme();
  return (
    <Card noShadow={noShadow}>
      <CardHeader
        icon={
          <ResponsiveImage
            css={{
              filter: `drop-shadow(0px 5px 5px ${theme.colors.purpleDark}`,
            }}
            srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fheart%2Fheart_64.png?alt=media&token=aca1639b-62f5-44ed-a0d1-3cea8e4797e2 64w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fheart%2Fheart_48.png?alt=media&token=7ef68a25-5362-48b9-b359-c46b48d1db54 48w"
            sizes="(min-width: 1440px) 64px, 48px"
            src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fheart%2Fheart_48.png?alt=media&token=7ef68a25-5362-48b9-b359-c46b48d1db54"
            alt="Heart"
          />
        }>
        <Typography variant="h2">Card</Typography>
      </CardHeader>

      <CardContent>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          eleifend, dui in commodo porttitor, neque metus lobortis sem, at
          suscipit arcu ligula non enim.
        </Typography>
      </CardContent>
    </Card>
  );
};

IconHeader.args = {};

export const FloatHeader: StoryObj<typeof Card> = ({ noShadow }: CardProps) => {
  return (
    <div>
      <CardHeader transparent>
        <Typography variant="h2">Card</Typography>
      </CardHeader>

      <Card noShadow={noShadow}>
        <CardContent>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            eleifend, dui in commodo porttitor, neque metus lobortis sem, at
            suscipit arcu ligula non enim.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
FloatHeader.args = {};

export const ItemCard: StoryObj<typeof Card> = ({ noShadow }: CardProps) => {
  const image = 'https://via.placeholder.com/42x42';
  const name = 'John Doe';

  return (
    <Card noShadow={noShadow}>
      <Wrapper direction="row">
        <Avatar size={42} image={image} className="lostpixel-ignore" />

        <CardContent
          style={{
            width: `calc(100% - 42px)`,
            paddingLeft: 15,
          }}>
          <div>
            <Typography variant="subtitle">{name}</Typography>
            <Typography variant="body1">Goal 25 km | 19,7 km</Typography>
          </div>

          <ProgressCircle
            {...{
              size: 50,
              max: 100,
              currentValue: 70,
              infoContent: <Typography variant="body1">70%</Typography>,
              color: 'purple',
            }}
          />
        </CardContent>
      </Wrapper>
    </Card>
  );
};
ItemCard.args = {};

export const ItemCardAction: StoryObj<typeof Card> = ({
  noShadow,
}: CardProps) => {
  const image = 'https://via.placeholder.com/42x42';
  const name = 'John Doe';

  return (
    <SwitchContextProvider initialState={true}>
      <Card noShadow={noShadow}>
        <Wrapper direction="row">
          <Avatar size={42} image={image} className="lostpixel-ignore" />

          <CardContent
            style={{
              width: 'calc(100% - 42px)',
            }}>
            <Wrapper direction="column">
              <div style={flexContainer}>
                <Typography variant="h6">{name}</Typography>
                <Button
                  variant="tertiary"
                  size="small"
                  onClick={() => console.log}
                  endIcon={<Icon name="more" />}
                />
              </div>

              <div style={flexContainer}>
                <Typography variant="body1">Goal 25 km | 19,7 km</Typography>

                <Switch label="switch" />
              </div>
            </Wrapper>
          </CardContent>
        </Wrapper>
      </Card>
    </SwitchContextProvider>
  );
};
ItemCardAction.args = {};

export const ItemCardAvatar: StoryObj<typeof Card> = ({
  noShadow,
}: CardProps) => {
  const image = 'https://via.placeholder.com/64x64';

  return (
    <Card noShadow={noShadow}>
      <Avatar size={64} image={image} className="lostpixel-ignore" />

      <CardContent>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          eleifend, dui in commodo porttitor, neque metus lobortis sem, at
          suscipit arcu ligula non enim.
        </Typography>
      </CardContent>
    </Card>
  );
};
ItemCardAvatar.args = {};

export const NoShadow: StoryObj<typeof Card> = ({ noShadow }: CardProps) => {
  return (
    <Card noShadow={noShadow}>
      <CardHeader>
        <Typography variant="h2">Card</Typography>
      </CardHeader>

      <CardContent>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          eleifend, dui in commodo porttitor, neque metus lobortis sem, at
          suscipit arcu ligula non enim.
        </Typography>
      </CardContent>
    </Card>
  );
};
NoShadow.args = {};

export const Clickable: StoryObj<typeof Card> = ({ onClick }: CardProps) => {
  return (
    <Card onClick={onClick}>
      <CardHeader>
        <Typography variant="h2">A clickable card</Typography>
      </CardHeader>

      <CardContent>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          eleifend, dui in commodo porttitor, neque metus lobortis sem, at
          suscipit arcu ligula non enim.
        </Typography>
      </CardContent>
    </Card>
  );
};
Clickable.args = {
  onClick: () => alert('Clicked!'),
};
