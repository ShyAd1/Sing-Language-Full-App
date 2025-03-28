package com.singlanguageappbackend.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LessonController {

    @GetMapping("/lessons")
    public List<Lesson> getLessons() {
        return Arrays.asList(
                new Lesson("Saludos", "Aprende a saludar en lenguaje de señas"),
                new Lesson("Números", "Cuenta del 1 al 10 con gestos")
        );
    }

    static class Lesson {
        private String name;
        private String description;

        public Lesson(String name, String description) {
            this.name = name;
            this.description = description;
        }

        public String getName() { return name; }
        public String getDescription() { return description; }
    }
}