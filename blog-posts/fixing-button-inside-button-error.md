# How I Fixed 5 Console Errors While Adding a Dark Mode Toggle to My Next.js App

I was following along with a course to add a dark mode toggle button to my Next.js app. Everything seemed fine — I copied the code exactly as shown — but my browser console was screaming at me with five different errors. My instructor's app worked perfectly, but mine didn't. Here's what happened and how I fixed it.

## The Problem

I had a simple theme switcher — a button that lets users toggle between light and dark mode. But when I ran the app, the console showed:

1. **"asChild does not exist on this element"**
2. **"A button cannot be inside another button"**
3. **"Script tag inside React component"**
4. **"asChild is not a valid HTML attribute"**
5. **"Hydration mismatch"**

Scary, right? At first I thought my whole setup was broken.

## What Was Actually Going On

The code I wrote looked like this:

```jsx
<Trigger asChild>
  <Button>Click me</Button>
</Trigger>
```

The idea was: "Take this `Trigger` component, but instead of rendering it as its own button, just use the `Button` component directly."

This pattern is called `asChild`, and it comes from a library called **Radix UI**. It's very common in older tutorials.

## The Catch

I was not using Radix UI. My project was using a newer library called **Base UI**.

Base UI doesn't have an `asChild` prop. It has something else called a `render` prop. Because `asChild` didn't exist in Base UI, my code just passed it down to the HTML, and the browser got confused.

The `Trigger` component rendered a `<button>`, and then inside it, my `Button` component also rendered a `<button>`. **A button inside a button** — that's not valid HTML, and React threw a fit.

## The Fix (One Line Changed)

I changed this:

```jsx
<Trigger asChild>
  <Button variant="outline" size="icon">
    <SunIcon />
    <MoonIcon />
  </Button>
</Trigger>
```

To this:

```jsx
<Trigger render={<Button variant="outline" size="icon" />}>
  <SunIcon />
  <MoonIcon />
</Trigger>
```

That's it. Just one word changed.

Instead of saying "use my Button as a child" (which Base UI doesn't understand), I said "**render** my Button as the trigger itself."

Base UI understood this immediately. It stopped creating a separate `<button>` wrapper, so there were no more nested buttons. All five errors vanished.

## Why You Might Hit This Too

If you're following a course or tutorial that was recorded a year or two ago, the instructor is probably using **Radix UI** with the `asChild` pattern. But if you started your project more recently and used `shadcn/ui` or similar tools, you might have **Base UI** installed instead.

They look almost identical at first glance, but that one small prop name makes all the difference.

## The Lesson

Don't panic when you see multiple console errors. Sometimes they all come from one tiny mistake. In my case, a single word change fixed five different errors.

If you see "button cannot be a descendant of button" or "asChild does not exist on DOM element," check your UI library first — you might just need to swap `asChild` for `render`.

---

*Hope this helps someone save a few hours of debugging!*