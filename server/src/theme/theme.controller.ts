import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ThemeService } from './theme.service';

@Controller('themes')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  /** GET /themes — list all available themes */
  @Get()
  findAll() {
    return {
      themes: this.themeService.findAll(),
      count: this.themeService.findAll().length,
    };
  }

  /** GET /themes/:id — fetch a single theme config */
  @Get(':id')
  findOne(@Param('id') id: string) {
    const theme = this.themeService.findById(id);
    if (!theme) {
      throw new NotFoundException(`Theme '${id}' not found`);
    }
    return theme;
  }
}
