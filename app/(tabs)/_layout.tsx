import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerStatusBarHeight: 40,
          title:'',
          tabBarShowLabel:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft:()=>(
            <View style={styles.headerLeftStyle}>
              <Text style={styles.titleStyle}>Username</Text>
              <Text style={styles.subTitleStyle}>username@gmail.com</Text>
            </View>
          ),
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={25} color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New Journal',
          tabBarShowLabel:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: 'Summary',
          tabBarShowLabel:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  headerLeftStyle:{
    flexDirection:'column',
    alignItems:'center',
    marginLeft:10,
    gap: 4, width: '100%',
    marginBottom: 20,
  },
  titleStyle:{
    fontSize: 20,
    fontWeight: 'bold',
    width:'100%'
  },
  subTitleStyle:{
    fontSize: 18,
    color: Colors.light.tint,
    width:'100%'
  }
})
