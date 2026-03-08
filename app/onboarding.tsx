import { router } from "expo-router";
import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function OnboardingScreen() {
  return (
    <Onboarding
      onDone={() => router.replace("/login")}
      onSkip={() => router.replace("/login")}
      pages={[
        {
          backgroundColor: "#E6E6FA",
          image: (
            <Image
              source={{
                uri: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg",
              }}
              style={{ width: 250, height: 250, borderRadius: 20 }}
            />
          ),
          title: "Welcome to SyncHer 💜",
          subtitle: "Balance your hormones, empower your health.",
        },
        {
          backgroundColor: "#E6E6FA",
          image: (
            <Image
              source={{
                uri: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
              }}
              style={{ width: 250, height: 250, borderRadius: 20 }}
            />
          ),
          title: "Track Your Cycle",
          subtitle:
            "Track periods, ovulation, and PCOD irregularities with ease.",
        },
        {
          backgroundColor: "#E6E6FA",
          image: (
            <Image
              source={{
                uri: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
              }}
              style={{ width: 250, height: 250, borderRadius: 20 }}
            />
          ),
          title: "Personalized Insights",
          subtitle: "Get AI-powered tips tailored to your health journey.",
        },
        {
          backgroundColor: "#E6E6FA",
          image: (
            <Image
              source={{
                uri: "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg",
              }}
              style={{ width: 250, height: 250, borderRadius: 20 }}
            />
          ),
          title: "Community & Support",
          subtitle: "Join a safe space to share, learn, and grow.",
        },
        {
          backgroundColor: "#E6E6FA",
          image: (
            <Image
              source={{
                uri: "https://images.pexels.com/photos/8436739/pexels-photo-8436739.jpeg",
              }}
              style={{ width: 250, height: 250, borderRadius: 20 }}
            />
          ),
          title: "Wellness Challenges",
          subtitle:
            "Stay motivated with hydration, yoga, and lifestyle streaks.",
        },
      ]}
    />
  );
}